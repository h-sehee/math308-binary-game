import Phaser from "phaser";
import BooleanBlock from "./booleanBlock";

export default class BlockGrid extends Phaser.GameObjects.Container {
    /*
        BlockGrid is a Container that acts as the grid upon which BooleanBlocks are placed
        This structure may be changed in the future due to limitations of the Container class
        BlockGrid is given a scene, x and y coordinates, and a sideLength representing the number of blocks to a side
        BooleanBlocks are stored location-wise in blockMatrix
    */
    blockMatrix: Array<Array<BooleanBlock>>; // blockMatrix stores the BooleanBlocks at each grid location from top left in the form [row][column]

    constructor(scene: Phaser.Scene, x: number, y: number, sideLength: number) {
        super(scene, x, y);
        let blockArray: Array<BooleanBlock> = this.generateRandomBlockArray(
            scene,
            sideLength
        );
        this.blockMatrix = [];
        for (let i = 0; i < sideLength; i++) {
            this.blockMatrix.push([]);
            for (let j = 0; j < sideLength; j++) {
                let index = i * 5 + j;
                super.add(blockArray[index]); // adds each BooleanBlock to the super container
                this.blockMatrix[i].push(blockArray[index]); // adds each BooleanBlock to the blockMatrix
            }
        }
        scene.add.existing(this);
    }

    // generates a list of BooleanBlocks of size sideLength^2 with random types
    private generateRandomBlockArray(scene: Phaser.Scene, sideLength: number) {
        let blockList: Array<string> = ["and", "or", "not", "true", "false"];
        let blockSize: number = 100;
        let out: Array<BooleanBlock> = [];
        let x: number = 0;
        let y: number = 0;
        for (let i = 0; i < sideLength ** 2; i++) {
            const newBlock = new BooleanBlock(
                scene,
                x,
                y,
                blockList[Math.floor(Math.random() * 5)],
                [Math.floor(i / sideLength), i % sideLength]
            );
            out.push(newBlock);
            newBlock.setInteractive();
            x += blockSize + 10;
            if (x >= (blockSize + 10) * sideLength) {
                x = 0;
                y += blockSize + 10;
            }
        }
        return out;
    }

    // returns the BooleanBlock at a certain index on the grid
    public getBlockAtLocation(index: [number, number]) {
        return this.blockMatrix[index[0]][index[1]];
    }

    // switches two BooleanBlocks on the grid based on their grid indexes
    public switchBlocks(indexA: [number, number], indexB: [number, number]) {
        let blockA: BooleanBlock = this.blockMatrix[indexA[0]][indexA[1]];
        let blockAx: number = blockA.x;
        let blockAy: number = blockA.y;
        let blockB: BooleanBlock = this.blockMatrix[indexB[0]][indexB[1]];
        let blockBx: number = blockB.x;
        let blockBy: number = blockB.y;

        blockA.setGridLocation(indexB);
        blockB.setGridLocation(indexA);

        this.blockMatrix[indexA[0]][indexA[1]] = blockB;
        this.blockMatrix[indexB[0]][indexB[1]] = blockA;

        blockA.x = blockBx;
        blockA.y = blockBy;
        blockB.x = blockAx;
        blockB.y = blockAy;
    }
}
