import Phaser from "phaser";
import BooleanBlock from "./booleanBlock";

export default class BlockGrid extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, sideLength: number) {
        super(scene);
        let blockArray: Array<Phaser.GameObjects.GameObject> =
            this.generateRandomBlockArray(scene, sideLength);
        for (let i = 0; i < blockArray.length; i++) {
            super.add(blockArray[i]);
        }
    }

    private generateRandomBlockArray(scene: Phaser.Scene, sideLength: number) {
        let blockList: Array<string> = ["and", "or", "not", "true", "false"];
        let out: Array<Phaser.GameObjects.GameObject> = [];
        let x: number = 300;
        let y: number = 300;
        for (let i = 0; i < sideLength ** 2; i++) {
            out.push(
                new BooleanBlock(
                    scene,
                    x,
                    y,
                    blockList[Math.floor(Math.random() * 5)]
                )
            );
            x += 60;
            if (x >= 60 * sideLength + 300) {
                x = 300;
                y += 60;
            }
        }
        return out;
    }
}
