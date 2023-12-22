import { Container, Sprite, Text, Texture } from "pixi.js";
// import { navigation } from "../utils/navigation";
import { color, font, fontSize } from "../ui/tokens";
import anime from "animejs";
import { Button } from "../ui/Button";
import { navigation } from "../utils/navigation";
import { GameScreen } from "../screens/GameScreen";
import { HomeScreen } from "../screens/HomeScreen";

/** The first screen that shows up after loading */
export class GameOverPopup extends Container {
  public static assetBundles = ['common'];

  /** The loading message display */
  private message: Text;
  private backdrop: Sprite;
  private replayButton: Button;
  private homeButton: Button;
  private scoreLabel: Text;
  private _score: number;

  constructor(score: number) {
    super();
    this._score = score;

    this.backdrop = this.addChild(Sprite.from(Texture.WHITE));
    this.backdrop.alpha = 0;
    this.backdrop.interactive = true;

    this.message = this.addChild(new Text("Game Over!", {
      fill: color.dark,
      fontFamily: font.flavor,
      fontSize: fontSize.large,
      align: 'center',
    }));
    this.message.anchor.set(0.5);
    this.message.pivot.set(0.5, 1);

    this.scoreLabel = this.addChild(new Text("", {
      fill: color.dark,
      fontFamily: font.flavor,
      fontSize: fontSize.large,
      align: 'center',
    }))
    this.scoreLabel.anchor.set(0.5, 1);
    this.scoreLabel.pivot.set(0.5, 1);

    this.replayButton = this.addChild(new Button({ text: "New Game" }));
    this.replayButton.onpointertap = async () => {
      await navigation.dismissPopup();
      await navigation.showScreen(GameScreen);
    }

    this.homeButton = this.addChild(new Button({ text: "Main Menu" }));
    this.homeButton.onpointertap = async () => {
      await navigation.dismissPopup();
      await navigation.showScreen(HomeScreen);
    }
  }

  /** Resize the screen, fired whenever window size changes  */
  public resize(width: number, height: number) {
    const centerX = width * 0.5
    this.message.x = centerX;
    this.message.y = height * 0.45 - this.message.height / 2;

    this.scoreLabel.x = centerX;
    this.scoreLabel.y = this.message.y - 20;

    this.replayButton.x = centerX;
    this.replayButton.y = this.message.y + this.message.height + 20;

    this.homeButton.x = centerX;
    this.homeButton.y = this.replayButton.y + this.replayButton.height + 10;

    this.backdrop.width = width;
    this.backdrop.height = height;
  }

  public async show() {
    const showBackdrop = anime({
      targets: [this.backdrop],
      alpha: 0.9,
      easing: 'easeInOutQuad',
      duration: 500,
    }).finished

    const showMessage = anime({
      targets: [this.message.scale],
      x: [0, 1],
      y: [0, 1],
      duration: 500,
    }).finished

    const showScore = anime({
      targets: [this.scoreLabel],
      text: [0, this._score],
      duration: this._score * 60,
      round: 1,
      easing: 'easeOutQuad'
    }).finished

    await Promise.allSettled([showBackdrop, showMessage, showScore]);
  }
}