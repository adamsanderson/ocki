import { Container } from "pixi.js";
import { GameBoard } from "../game/Board";
import { ScoreCounter } from "../game/ScoreCounter";

/** The first screen that shows up after loading */
export class GameScreen extends Container {
  public static assetBundles = ['common', 'game'];
  private gameBoard: GameBoard;
  private scoreCounter: ScoreCounter;
  

  constructor() {
    super();
    
    this.scoreCounter = new ScoreCounter();
    this.addChild(this.scoreCounter);

    this.gameBoard = new GameBoard();
    this.gameBoard.on('removePieces', (ev) => this.scoreCounter.removedPieces(ev.count))
    this.addChild(this.gameBoard);

  }

  /** Resize the screen, fired whenever window size changes  */
  public resize(width: number, height: number) {
    this.scoreCounter.x = 20;
    this.scoreCounter.y = 30;
    this.gameBoard.x = width/2 - this.gameBoard.width/2;
    this.gameBoard.y = height/2 - this.gameBoard.height/2;
  }
}