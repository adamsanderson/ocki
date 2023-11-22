import { Container } from "pixi.js";
import { Piece } from "./Piece";

type MaybePiece = Piece|null;
type GameColumn = MaybePiece[];

export class GameBoard extends Container {
  private board: GameColumn[];
  private scaleX = 64 + 2;
  private scaleY = 64 + 10;

  constructor(
    private rowCount = 8, 
    private colCount = 8,
  ) {
    super()
    this.board = new Array(colCount);

    for (let c = 0; c < colCount; c++) {
      const col = new Array(rowCount) as GameColumn
      for (let r = 0; r < rowCount; r++) {
        const piece = Piece.random(c * this.scaleX, r * this.scaleY);
        this.addChild(piece);
        this.listenToPiece(piece);
        col[r] = piece;
      }
      this.board[c] = col;
    }
  }

  listenToPiece(piece: Piece) {
    piece.on('pointerover', () => {
      console.log(piece.type)
    });
  }
}