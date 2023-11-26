import { ColorMatrixFilter, Container, Sprite, Filter } from "pixi.js"

const PIECE_TYPES = ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5'] as const
type PieceType = typeof PIECE_TYPES[number]

const HOVER_FILTER = new ColorMatrixFilter();
HOVER_FILTER.brightness(1.25, false);
HOVER_FILTER.contrast(0.6, false);

const DEFAULT_FILTER_SET: Filter[] = [];
const HOVER_FILTER_SET: Filter[] = [HOVER_FILTER];

export class Piece extends Container {
  private sprite: Sprite;
  private isHovered: boolean;
  public readonly type: PieceType;
  private _i: number;
  private _j: number;

  constructor(type: PieceType, x: number, y: number) {
    super()
    this.type = type;
    this._i = 0;
    this._j = 0;

    this.sprite = Sprite.from(type)
    this.x = x;
    this.y = y;
    
    this.addChild(this.sprite);
    this.eventMode = 'static';
    this.isHovered = false;
  }
  
  static random(x: number, y: number): Piece {
    const type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)]
    return new Piece(type, x, y)
  }
  
  is(type: PieceType) {
    return this.type === type;
  }

  set i(value: number) {
    this._i = value;
  }

  get i() {
    return this._i;
  }

  set j(value: number) {
    this._j = value;
  }

  get j() {
    return this._j;
  }

  setIsHovered(hovered: boolean) {
    this.isHovered = hovered;
    if (this.isHovered) {
      this.filters = HOVER_FILTER_SET;
    } else {
      this.filters = DEFAULT_FILTER_SET;
    }
  }
}