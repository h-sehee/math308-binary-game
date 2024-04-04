import Phaser from "phaser";
import BooleanBlock from "./booleanBlock";

export default class BlockGrid extends Phaser.GameObjects.Container {
    blockMatrix: Array<Array<BooleanBlock>>;
    private blockSize: number = 100;
    private blockSpacing: number = 10;

    constructor(scene: Phaser.Scene, sideLength: number) {
        super(scene);
        this.blockMatrix = [];
        for (let i = 0; i < sideLength; i++) {
            this.blockMatrix.push([]);
            for (let j = 0; j < sideLength; j++) {
                let block = this.createRandomBlock(i, j);
                this.blockMatrix[i].push(block);
                this.add(block);
            }
        }
        this.recenterGrid();
        scene.add.existing(this);
        scene.sound.add("block-break");
    }

    public createRandomBlock(row: number, col: number): BooleanBlock {
        let blockList: Array<string> = ["and", "or", "not", "true", "false"];
        let blockType = blockList[Math.floor(Math.random() * blockList.length)];
        let x = col * (this.blockSize + this.blockSpacing);
        let y = row * (this.blockSize + this.blockSpacing);
        let block = new BooleanBlock(this.scene, x, y, blockType, [row, col]);
        block.setInteractive();
        return block;
    }

    public getBlockAtLocation(index: [number, number]) {
        return this.blockMatrix[index[0]][index[1]];
    }

    public switchBlocks(indexA: [number, number], indexB: [number, number]) {
        let blockA = this.blockMatrix[indexA[0]][indexA[1]];
        let blockB = this.blockMatrix[indexB[0]][indexB[1]];
        this.blockMatrix[indexA[0]][indexA[1]] = blockB;
        this.blockMatrix[indexB[0]][indexB[1]] = blockA;
        this.updateBlockPositions();
    }

    public evaluateBooleanExpression(blocks: Array<BooleanBlock>): boolean {
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

    public findTruthyStatements(): Array<{
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
    }

    public checkForTruthy(): boolean {
        let foundTruthy = this.findTruthyStatements();
        let hasUpdated = false;

        if (foundTruthy && foundTruthy.length > 0) {
            for (const statement of foundTruthy) {
                if (statement.type === "row") {
                    this.removeRow(statement.index);
                    this.scene.sound.play("block-break", { volume: 0.6 });
                } else {
                    this.removeColumn(statement.index);
                    this.scene.sound.play("block-break", { volume: 0.6 });
                }
                hasUpdated = true;
            }
            if (hasUpdated) {
                this.updateBlockPositions();
            }
        }
        return hasUpdated;
    }

    public removeRow(rowIndex: number) {
        this.blockMatrix[rowIndex].forEach((block) => {
            block.destroy();
        });
        this.blockMatrix.splice(rowIndex, 1);
        this.addNewRow();
    }

    public removeColumn(colIndex: number) {
        for (let i = 0; i < this.blockMatrix.length; i++) {
            let blockToRemove = this.blockMatrix[i][colIndex];
            blockToRemove.destroy();
        }

        for (let i = 0; i < this.blockMatrix.length; i++) {
            this.blockMatrix[i].splice(colIndex, 1);
        }

        for (let i = 0; i < this.blockMatrix.length; i++) {
            let block = this.createRandomBlock(i, colIndex);
            this.blockMatrix[i].splice(colIndex, 0, block);
            this.add(block);
        }
    }

    public addNewColumn() {
        for (let row = 0; row < this.blockMatrix.length; row++) {
            let block = this.createRandomBlock(
                row,
                this.blockMatrix[row].length
            );
            this.blockMatrix[row].push(block);
            this.add(block);
        }
    }

    public addNewRow() {
        let newRow: Array<BooleanBlock> = [];
        for (let col = 0; col < this.blockMatrix[0].length; col++) {
            let block = this.createRandomBlock(0, col);
            newRow.push(block);
            this.add(block);
        }
        this.blockMatrix.unshift(newRow);
    }

    public updateBlockPositions() {
        for (let row = 0; row < this.blockMatrix.length; row++) {
            for (let col = 0; col < this.blockMatrix[row].length; col++) {
                let block = this.blockMatrix[row][col];
                block.x = col * (this.blockSize + this.blockSpacing);
                block.y = row * (this.blockSize + this.blockSpacing);
                block.setGridLocation([row, col]);
            }
        }
        this.recenterGrid();
    }

    private recenterGrid() {
        let gridWidth =
            this.blockMatrix[0].length * (this.blockSize + this.blockSpacing) -
            this.blockSpacing;
        let gridHeight =
            this.blockMatrix.length * (this.blockSize + this.blockSpacing) -
            this.blockSpacing;
        this.x = (this.scene.scale.width - gridWidth) / 2 + 30;
        this.y = (this.scene.scale.height - gridHeight) / 2 + 40;
    }
}
