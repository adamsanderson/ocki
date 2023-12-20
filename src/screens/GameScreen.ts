import { Container } from "pixi.js";
import { GameBoard } from "../game/Board";
import { ScoreCounter } from "../game/ScoreCounter";
import { BackButton } from "../game/BackButton";
import { navigation } from "../utils/navigation";
import { HomeScreen } from "./HomeScreen";
import { GameOverPopup } from "../popups/GameOverPopup";

/** The first screen that shows up after loading */
export class GameScreen extends Container {
  public static assetBundles = ['common', 'game'];
  private gameBoard: GameBoard;
  private scoreCounter: ScoreCounter;
  private backButton: BackButton;


  constructor() {
    super();

    this.scoreCounter = new ScoreCounter();
    this.addChild(this.scoreCounter);

    this.backButton = new BackButton();
    this.backButton.width /= 2;
    this.backButton.height /= 2;
    this.backButton.on('pointerup', (ev) => {
      if (ev.shiftKey) {
        navigation.presentPopup(GameOverPopup)
      } else {
        navigation.showScreen(HomeScreen)
      }
    })
    this.addChild(this.backButton);


    this.gameBoard = new GameBoard();
    this.gameBoard.on('removePieces', (ev) => this.scoreCounter.removedPieces(ev.count))
    this.gameBoard.on('gameOver', () => navigation.presentPopup(GameOverPopup))
    this.addChild(this.gameBoard);

  }

  /** Resize the screen, fired whenever window size changes  */
  public resize(width: number, height: number) {
    this.scoreCounter.x = width - 20 - this.scoreCounter.width;
    this.scoreCounter.y = 30;
    
    this.backButton.x = this.backButton.width / 2;
    this.backButton.y = 35 - this.backButton.height / 2;

    this.gameBoard.x = width / 2 - this.gameBoard.width / 2;
    this.gameBoard.y = height / 2 - this.gameBoard.height / 2;
  }
}