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
  
    private evaluateBooleanExpression(blocks: Array<BooleanBlock>): boolean {
        let expression = blocks
            .map((block) => {
                switch (block.getBlockType()) {
                    case "and":
                        return "&&";
                    case "or":
                        return "||";
                    case "not":
                        return "!";
                    case "true":
                        return "true";
                    case "false":
                        return "false";
                    default:
                        return "";
                }
            })
            .join(" ");

        try {
            return eval(expression) as boolean;
        } catch (error) {
            return false;
        }
    }

    public checkForTruthy(): Array<{
        type: "row" | "column";
        index: number;
    }> | null {
        let outArray: Array<{ type: "row" | "column"; index: number }> = [];
        for (let row = 0; row < this.blockMatrix.length; row++) {
            if (this.evaluateBooleanExpression(this.blockMatrix[row])) {
                console.log(`Truthy statement found in row ${row}`);
                outArray.push({ type: "row", index: row });
            }
        }

        for (let col = 0; col < this.blockMatrix.length; col++) {
            let columnBlocks = this.blockMatrix.map((row) => row[col]);
            if (this.evaluateBooleanExpression(columnBlocks)) {
                console.log(`Truthy statement found in column ${col}`);
                outArray.push({ type: "column", index: col });
            }
        }

        return outArray;

    //removes a specific row and adds a new row to the top row of the grid
    public removeRow(rowIndex: number) {
        this.blockMatrix.splice(rowIndex, 1); //remove the row
        let newRow = this.generateRandomBlockArray(this.scene, 1); //create a new row at the top
        this.blockMatrix.unshift(newRow); //add new row to the beginning of matrix
    }

    //remove a specific column and add new blocks from the top
    public removeColumn(colIndex: number) {
        for (let i = 0; i < this.blockMatrix.length; i++) {
            //remove the block from the column
            let blockToRemove = this.blockMatrix[i][colIndex];
            this.remove(blockToRemove);
            blockToRemove.destroy(); //remove the block and destroy it

            //add a new block to the top
            let newBlock = this.generateRandomBlockArray(this.scene, 1)[0];
            this.add(newBlock);
            newBlock.setGridLocation([0, colIndex]);

            //move existing blocks down
            for (let j = i; j > 0; j--) {
                this.blockMatrix[j][colIndex] =
                    this.blockMatrix[j - 1][colIndex];
                this.blockMatrix[j][colIndex].setGridLocation([j, colIndex]);
            }

            //place the new block in the first row
            this.blockMatrix[0][colIndex] = newBlock;
        }
    }

    //removes a specific row and adds a new row to the top row of the grid
    public removeRow(rowIndex: number) {
        this.blockMatrix.splice(rowIndex, 1); //remove the row
        let newRow = this.generateRandomBlockArray(this.scene, 1); //create a new row at the top
        this.blockMatrix.unshift(newRow); //add new row to the beginning of matrix
    }

    //remove a specific column and add new blocks from the top
    public removeColumn(colIndex: number) {
        for (let i = 0; i < this.blockMatrix.length; i++) {
            //remove the block from the column
            let blockToRemove = this.blockMatrix[i][colIndex];
            this.remove(blockToRemove);
            blockToRemove.destroy(); //remove the block and destroy it

            //add a new block to the top
            let newBlock = this.generateRandomBlockArray(this.scene, 1)[0];
            this.add(newBlock);
            newBlock.setGridLocation([0, colIndex]);

            //move existing blocks down
            for (let j = i; j > 0; j--) {
                this.blockMatrix[j][colIndex] =
                    this.blockMatrix[j - 1][colIndex];
                this.blockMatrix[j][colIndex].setGridLocation([j, colIndex]);
            }

            //place the new block in the first row
            this.blockMatrix[0][colIndex] = newBlock;
        }
    }
}
