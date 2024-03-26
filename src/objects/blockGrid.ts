import Phaser from "phaser";
import BooleanBlock from "./booleanBlock";

export default class BlockGrid extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, sideLength: number) {
        super(scene, x, y);
        let blockArray: Array<Phaser.GameObjects.GameObject> =
            this.generateRandomBlockArray(scene, sideLength);
        for (let i = 0; i < blockArray.length; i++) {
            super.add(blockArray[i]);
        }
    }

    private generateRandomBlockArray(scene: Phaser.Scene, sideLength: number) {
        let blockList: Array<string> = ["and", "or", "not", "true", "false"];
        let blockSize: number = 100;
        let out: Array<Phaser.GameObjects.GameObject> = [];
        let x: number = 0;
        let y: number = 0;
        for (let i = 0; i < sideLength ** 2; i++) {
            out.push(
                new BooleanBlock(
                    scene,
                    x,
                    y,
                    blockList[Math.floor(Math.random() * 5)]
                )
            );
            x += blockSize + 10;
            if (x >= (blockSize + 10) * sideLength) {
                x = 0;
                y += blockSize + 10;
            }
        }
        return out;
    }
}
