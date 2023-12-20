import { Container } from "pixi.js";
import { Logo } from "./LoadScreen/Logo";
import { Button } from "../ui/Button";
import { navigation } from "../utils/navigation";
import { GameScreen } from "./GameScreen";
import anime from "animejs";

/** The first screen that shows up after loading */
export class HomeScreen extends Container {
  public static assetBundles = ['common'];

  private logo: Logo;
  private playButton: Button;
  private aboutButton: Button;

  constructor() {
    super();

    this.playButton = this.addChild(new Button({ text: "Play" }));
    this.aboutButton = this.addChild(new Button({ text: "About" }));

    this.logo = new Logo();
    this.addChild(this.logo);

    this.playButton.onpointertap = () => {
      navigation.showScreen(GameScreen)
    }
  }

  /** Resize the screen, fired whenever window size changes  */
  public resize(width: number, height: number) {
    const centerX = width * 0.5
    this.logo.x = centerX + 10;
    this.logo.y = height / 4;

    this.playButton.x = centerX;
    this.playButton.y = this.logo.getBounds().bottom + 10 + this.playButton.height / 2;
    this.aboutButton.x = centerX;
    this.aboutButton.y = this.playButton.getBounds().bottom + 10 + this.playButton.height / 2;
  }

  public async hide() {
    await Promise.allSettled([
      this.hideButtons(),
      this.hideLogo(),
    ]);
  }

  hideLogo() {
    return anime({
      targets: this.logo,
      alpha: {
        value: 0,
        duration: 200,
        easing: 'linear',
      }
    }).finished;
  }

  hideButtons() {
    return anime({
      targets: [this.aboutButton, this.playButton],
      alpha: {
        value: 0,
        duration: 200,
        easing: 'linear',
        delay: anime.stagger(100, { start: 500 }),
      },
      y: {
        value: anime.stagger([this.aboutButton.y + 600, this.playButton.y + 600]),
        duration: 1000,
        easing: 'cubicBezier(0.000, -0.130, 0.560, -0.595)',
        delay: anime.stagger(100, { start: 0 }),
      },
    }).finished
  }
}