import { Container, FederatedPointerEvent } from "pixi.js";
import { Piece } from "./Piece";
import anime from "animejs";
import { StarBurst } from "./StarBurst";

type MaybePiece = Piece | null;
type GameColumn = MaybePiece[];

export class GameBoard extends Container {
  private board: GameColumn[];
  private scaleX = 64 + 2;
  private scaleY = 64 + 10;

  private hoveredPieces: Set<Piece>;

  constructor(
    private rowCount = 8,
    private colCount = 8,
  ) {
    super()
    this.board = new Array(colCount);
    this.hoveredPieces = new Set();

    for (let i = 0; i < colCount; i++) {
      const col = new Array(rowCount) as GameColumn
      for (let j = 0; j < rowCount; j++) {
        const piece = Piece.random(i * this.scaleX, j * this.scaleY);
        piece.i = i;
        piece.j = j;
        this.addChild(piece);
        this.listenToPiece(piece);
        col[j] = piece;
      }
      this.board[i] = col;
    }
  }

  listenToPiece(piece: Piece) {
    piece.on('pointerover', () => this.hoverPiece(piece));
    piece.on('pointerup', (event) => this.clickPiece(event, piece));
  }

  hoverPiece(piece: Piece) {
    if (!this.hoveredPieces.has(piece)) {
      this.hoveredPieces.forEach(p => p.setIsHovered(false));
      this.hoveredPieces = this.getConnected(piece);
      if (this.hoveredPieces.size > 1) {
        this.hoveredPieces.forEach(p => p.setIsHovered(true));
      }
    }
  }

  async clickPiece(event: FederatedPointerEvent, piece: Piece) {
    this.hoverPiece(piece);
    if (this.hoveredPieces.size > 1) {
      this.hoveredPieces.forEach(p => this.removePiece(p));
      this.removeChild(...this.hoveredPieces);

      this.emit('removePieces', {count: this.hoveredPieces.size})

      const starBurst = new StarBurst(this.hoveredPieces.size * 2);
      starBurst.x = event.x - this.x;
      starBurst.y = event.y - this.y;
      this.addChild(starBurst);

      this.eventMode = 'none';
      await this.dropPieces();
      await this.shiftPieces();
      this.eventMode = 'auto';
      if (!this.hasValidMoves()) {
        this.emit('gameOver');
      }
    }
  }

  hasValidMoves() {
    for (let i = 0; i < this.colCount; i++) {
      for (let j = 0; j < this.rowCount; j++) {
        const piece = this.getPiece(i,j);
        if (piece && this.hasConnectedPiece(piece)) {
          return true;
        }
      }
    }

    return false;
  }

  hasConnectedPiece(piece: Piece): boolean {
    const type = piece.type;
    if (this.getPiece(piece.i - 1, piece.j)?.type === type) {
      return true;
    }
    if (this.getPiece(piece.i + 1, piece.j)?.type === type) {
      return true;
    }
    if (this.getPiece(piece.i, piece.j - 1)?.type === type) {
      return true;
    }
    if (this.getPiece(piece.i, piece.j + 1)?.type === type) {
      return true;
    }

    return false;
  }

  getConnected(piece: Piece) {
    const connected = new Set<Piece>();

    const candidates = [piece];
    let nextPiece: MaybePiece;

    while (candidates.length > 0) {
      const current = candidates.pop() as Piece;
      connected.add(current);

      nextPiece = this.getPiece(current.i - 1, current.j);
      if (nextPiece?.type === piece.type && !connected.has(nextPiece)) candidates.push(nextPiece!);

      nextPiece = this.getPiece(current.i + 1, current.j);
      if (nextPiece?.type === piece.type && !connected.has(nextPiece)) candidates.push(nextPiece!);

      nextPiece = this.getPiece(current.i, current.j - 1);
      if (nextPiece?.type === piece.type && !connected.has(nextPiece)) candidates.push(nextPiece!);

      nextPiece = this.getPiece(current.i, current.j + 1);
      if (nextPiece?.type === piece.type && !connected.has(nextPiece)) candidates.push(nextPiece!);
    }

    return connected;
  }

  getPiece(i: number, j: number): Piece | null {
    if (i >= 0 && i < this.colCount && j >= 0 && j < this.rowCount) {
      return this.board[i][j];
    }

    return null;
  }

  removePiece(piece: Piece) {
    const toRemove = this.board[piece.i][piece.j];
    if (piece !== toRemove) throw new Error(`Piece mismatch at ${piece.i},${piece.j}`)
    this.board[piece.i][piece.j] = null;
  }

  dropPieces() {
    const promises: Promise<void>[] = [];
    for (let i = 0; i < this.colCount; i++) {
      const col = this.board[i];
      const filtered = col.filter(p => p)
      const newCol = new Array<MaybePiece>(this.rowCount - filtered.length).fill(null).concat(filtered);

      // Update the `j` position for each piece
      for (let j = 0; j < this.rowCount; j++) {
        const piece = newCol[j];
        if (piece && piece.j !== j) {
          promises.push(
            anime({
              targets: piece,
              y: j * this.scaleY,
              easing: 'easeOutBounce',
              duration: (j - piece.j) * 250
            }).finished
          );

          piece.j = j;
        }
      }

      this.board[i] = newCol;
    }
    return Promise.all(promises);
  }

  shiftPieces() {
    const promises: Promise<void>[] = [];
    const filtered = this.board.filter(col => col.some(p => p));
    const emptyCol = new Array(this.rowCount).fill(null);
    const newBoard = new Array<MaybePiece[]>(this.colCount - filtered.length).fill(emptyCol).concat(filtered);

    for (let i = 0; i < this.colCount; i++) {
      for (let j = 0; j < this.rowCount; j++) {
        const piece = newBoard[i][j];
        if (piece && piece.i !== i) {
          promises.push(
            anime({
              targets: piece,
              x: i * this.scaleX,
              easing: 'easeInOutQuad',
              duration: (i - piece.i) * 50
            }).finished
          );
          
          piece.i = i;
        }
      }
    }

    this.board = newBoard;
    return Promise.all(promises);
  }
}