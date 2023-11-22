import { Container, Text } from 'pixi.js';
import { Logo } from './LoadScreen/Logo';
import { color, font, fontSize } from '../ui/tokens';
import anime from 'animejs';

/** Screen shown while loading assets */
export class LoadScreen extends Container {
    /** Assets bundles required by this screen */
    public static assetBundles = ['preload'];
    
    private logo: Logo;
    
    /** The loading message display */
    private message: Text;

    constructor() {
        super();

        this.logo = new Logo();
        this.addChild(this.logo);

        this.message = new Text("Loading!", {
            fill: color.dark,
            fontFamily: font.ui,
            fontSize: fontSize.medium,
            align: 'center',
        });
        this.message.anchor.set(0.5);
        this.addChild(this.message);
    }

    /** Resize the screen, fired whenever window size changes  */
    public resize(width: number, height: number) {
        this.message.x = width * 0.5;
        this.message.y = height * 0.45;

        this.logo.x = width * 0.5 + 10;
        this.logo.y = height/4;
        console.log('resize')
    }

    /** Show screen with animations */
    public async show() {
        
    }

    /** Hide screen with animations */
    public async hide() {
        // Change then hide the loading message
        this.message.text = "Loaded!";
        
        await anime({
            targets: this.message,
            alpha: {
                value: 0,
                duration: 500,
                delay: 500,
                easing: 'linear',
            },
            y: {
                value: this.message.y - 50,
                duration: 1000,
                easing: 'cubicBezier(0.350, 0.005, 0.950, -0.600)'
            }
        }).finished;
    }
}
