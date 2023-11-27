import anime from "animejs";
import { Container, Sprite } from "pixi.js";

const MIN_DISTANCE = 50;
const MAX_DISTANCE = 150;
const MIN_DURATION = 100;
const MAX_DURATION = 500;

export class StarBurst extends Container {
    constructor(count = 5) {
        super();
        const promises: Promise<void>[] = new Array(count)

        while (count-- > 0) {
            const star = Sprite.from('star');
            star.scale.x = 0.5;
            star.scale.y = 0.5;
            this.addChild(star);

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * (MAX_DISTANCE - MIN_DISTANCE) + MIN_DISTANCE;
            const duration = Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION;
            const animation = anime({
                targets: [star],
                x: {
                    value: Math.cos(angle) * distance,
                    easing: 'easeOutQuad',
                    duration,
                },
                y: {
                    value: Math.sin(angle) * distance,
                    easing: 'easeOutQuad',
                    duration,
                },
                alpha: {
                    value: 0,
                    delay: duration / 2,
                    duration: duration / 2,
                    easing: 'linear'
                }
            })
            promises[count] = animation.finished
        }

        Promise.all(promises).then(() => {
            this.removeFromParent();
        })
    }
}