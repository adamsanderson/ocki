import { Container } from "pixi.js";
import { GameBoard } from "../game/Board";

/** The first screen that shows up after loading */
export class GameScreen extends Container {
  public static assetBundles = ['common', 'game'];
  private gameBoard: GameBoard;

  constructor() {
    super();
    this.gameBoard = new GameBoard();
    this.addChild(this.gameBoard);
  }

  /** Resize the screen, fired whenever window size changes  */
  public resize(width: number, height: number) {
    this.gameBoard.x = width/2 - this.gameBoard.width/2;
    this.gameBoard.y = height/2 - this.gameBoard.height/2;
  }
}