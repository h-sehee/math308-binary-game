import Phaser from "phaser";

export default class BooleanBlock extends Phaser.GameObjects.Image {
    /*
    BooleanBlock is the GameObject that represents the blocks on the board
    It is given a scene, x and y coordinates, and a texture based on its type
    */
    constructor(scene: Phaser.Scene, x: number, y: number, type: string) {
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
                img = "not-block";
                break;
            }
            case "true": {
                img = "true-block";
                break;
            }
            case "false": {
                img = "false-block";
                break;
            }
        }

        super(scene, x, y, img);
    }
}
