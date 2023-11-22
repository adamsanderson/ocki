import { Container, FederatedEventHandler, FederatedPointerEvent, Sprite } from "pixi.js"

const PIECE_TYPES = ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5'] as const
type PieceType = typeof PIECE_TYPES[number]

export class Piece extends Container {
  private sprite: Sprite;
  public readonly type: PieceType;

  constructor(type: PieceType, x: number, y: number) {
    super()
    this.type = type;
    this.sprite = Sprite.from(type)
    this.sprite.x = x;
    this.sprite.y = y;
    this.addChild(this.sprite);
    this.eventMode = 'static'
  }
  
  static random(x: number, y: number): Piece {
    const type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)]
    return new Piece(type, x, y)
  }
  
  is(type: PieceType) {
    return this.type === type;
  }
}