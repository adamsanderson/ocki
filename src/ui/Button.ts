import { FancyButton } from '@pixi/ui';
import { NineSlicePlane, Texture, Text } from 'pixi.js';
import { font, fontSize } from './tokens';

const DEFAULT_OPTIONS = {
  text: '',
  width: 190,
  height: 64,
};

type ButtonOptions = typeof DEFAULT_OPTIONS;

/**
 * The big rectangle button, with a label, idle and pressed states
 */
export class Button extends FancyButton {
  constructor(options: Partial<ButtonOptions> = {}) {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    const defaultView = new NineSlicePlane(Texture.from('button-blue'), 16, 16, 16, 24);
    defaultView.width = opts.width;
    defaultView.height = opts.height;

    const hoverView = new NineSlicePlane(Texture.from('button-blue-hover'), 16, 16, 16, 24);
    hoverView.width = opts.width;
    hoverView.height = opts.height;

    const pressedView = new NineSlicePlane(Texture.from('button-blue-press'), 16, 16, 16, 24);
    pressedView.width = opts.width;
    pressedView.height = opts.height;

    const text = new Text(opts.text, {
      fill: 0x73B1BF,
      fontFamily: font.ui,
      fontSize: fontSize.medium,
      align: 'center',
    });

    super({
      defaultView,
      hoverView,
      pressedView,
      anchor: 0.5,
      text,
    });

    this.textOffset = {
      default: {
        y: -5
      },
      hover: {
        y: -5
      },
      pressed: {
        y: -2
      }
    }

    // this.onDown.connect(this.handleDown.bind(this));
    // this.onUp.connect(this.handleUp.bind(this));
    // this.onHover.connect(this.handleHover.bind(this));
    // this.on('pointerupoutside', this.handleUp.bind(this));
    // this.on('pointerout', this.handleUp.bind(this));
  }

  // /** Show the component */
  // public async show(animated = true) {
  //   gsap.killTweensOf(this.pivot);
  //   this.visible = true;
  //   if (animated) {
  //     this.pivot.y = -200;
  //     await gsap.to(this.pivot, { y: 0, duration: 0.5, ease: 'back.out' });
  //   } else {
  //     this.pivot.y = 0;
  //   }
  //   this.interactiveChildren = true;
  // }

  // /** Hide the component */
  // public async hide(animated = true) {
  //   this.interactiveChildren = false;
  //   gsap.killTweensOf(this.pivot);
  //   if (animated) {
  //     await gsap.to(this.pivot, { y: -200, duration: 0.3, ease: 'back.in' });
  //   } else {
  //     this.pivot.y = -200;
  //   }
  //   this.visible = false;
  // }
}
