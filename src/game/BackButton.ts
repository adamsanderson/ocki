import anime from "animejs";
import { Container, Sprite } from "pixi.js";

export class BackButton extends Container {
  private icon: Sprite;

  constructor() {
    super();
    this.icon = Sprite.from("back")
    this.icon.pivot.x = 0;
    this.icon.pivot.y = this.icon.height / 2;
    this.addChild(this.icon);
    this.eventMode = 'static';    
    
    this.onpointerover = () => {
      anime({
        targets: this.icon.scale,
        keyframes: [
          { x: 1.5, y: 1.25 },
          { x: 1, y: 1 },
        ],
        easing: 'easeInCubic',
        duration: 250,
      });
    }
  }
}