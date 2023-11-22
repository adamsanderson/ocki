import { Container, Sprite } from 'pixi.js';
import anime, { AnimeInstance } from 'animejs';

/** Placeholder logo UI component */
export class Logo extends Container {
    /** The logo image */
    private image: Sprite;

    private animation: AnimeInstance;

    constructor() {
        super();
        this.image = Sprite.from('logo');
        this.image.anchor.set(0.5);
        this.addChild(this.image);
        this.animation = anime({
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