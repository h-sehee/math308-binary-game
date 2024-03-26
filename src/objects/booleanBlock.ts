import Phaser from "phaser";

export default class BooleanBlock extends Phaser.GameObjects.Image {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        type: "and" | "or" | "not" | "true" | "false"
    ) {
        let img: string = "";
        switch (type) {
            case "and": {
                img = "and-block";
                break;
            }
            case "or": {
                img = "or-block";
                break;
            }
            case "not": {
                img = "and-block";
                break;
            }
            case "true": {
                img = "true-block";
                break;
            }
            case "false": {
                img = "true-block";
                break;
            }
        }

        super(scene, x, y, img);
    }
}
