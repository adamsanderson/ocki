import { Container, Text } from "pixi.js";
import { color, font, fontSize } from "../ui/tokens";
import anime from "animejs";

export class ScoreCounter extends Container {
    BONUS_FACTOR = 1.4;
    private _score = 0;
    private label: Text;

    constructor() {
        super();
        this.label = new Text(this._score.toString(), {
            fill: color.dark,
            fontFamily: font.flavor,
            fontSize: fontSize.large,
            align: "right",
        });
        this.label.pivot.x = this.label.width / 2;
        this.label.pivot.y = this.label.height / 2;
        this.addChild(this.label);
    }

    get score() {
        return this._score;
    }

    removedPieces(count: number) {
        this._score = Math.floor(this._score + count ** this.BONUS_FACTOR);
        this.label.text = this._score.toString();
        anime({
            targets: this.label.scale,
            keyframes: [
                {x: 1.5, y: 1.5},
                {x: 1, y: 1},
            ],
            duration: 250,
        })
    }
}