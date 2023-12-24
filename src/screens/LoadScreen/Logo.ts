import { Container, Sprite } from 'pixi.js';
import anime from 'animejs';

/** Placeholder logo UI component */
export class Logo extends Container {
    /** The logo image */
    private image: Sprite;

    constructor() {
        super();
        this.image = Sprite.from('logo');
        this.image.anchor.set(0.5);
        this.addChild(this.image);
        anime({
          targets: this.scale,
          x: [0.95,1],
          y: [0.95,1],
          easing: 'easeInQuad',
          loop: true,
          duration: 500,
          direction: 'alternate',
        })
    }
    
}