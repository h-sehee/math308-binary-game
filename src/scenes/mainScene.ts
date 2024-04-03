import Phaser from "phaser";
import BlockGrid from "../objects/blockGrid";
import FpsText from "../objects/fpsText";
import BooleanBlock from "../objects/booleanBlock";

export default class MainScene extends Phaser.Scene {
    fpsText: FpsText;
    locationBuffer: [number, number] | undefined;
    blockGrid: BlockGrid;
    timer: Phaser.Time.TimerEvent;
    timeLimitInSeconds: number = 120;
    timerText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.blockGrid = new BlockGrid(this, 400, 150, 5);
        this.fpsText = new FpsText(this);

        this.input.on("pointerdown", this.mouseClick, this);

        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);

        this.timer = this.time.addEvent({
            delay: 1000, // 1 second
            callback: () => {
                this.timeLimitInSeconds--;
                if (this.timeLimitInSeconds <= 0) {
                    this.scene.start("NextScene"); // Replace 'NextScene' with the key of our next scene
                    //For the next scene we should display the score and then give them the option to play again
                }
            },
            callbackScope: this,
            loop: true,
        });

        this.timerText = this.add
            .text(
                this.cameras.main.width - 15,
                this.cameras.main.height - 15,
                `Time: ${this.timeLimitInSeconds}`,
                {
                    color: "#000000",
                    fontSize: "24px",
                }
            )
            .setOrigin(1, 1);
    }

    mouseClick(
        pointer: Phaser.Input.Pointer,
        currentlyOver: Array<Phaser.GameObjects.GameObject>
    ) {
        if (currentlyOver[0] instanceof BooleanBlock) {
            // typeguard to make sure clicked on object is a BooleanBlock
            if (this.locationBuffer == undefined) {
                // store location in buffer if it is empty
                this.locationBuffer = currentlyOver[0].getGridLocation();
            } else {
                // switch the blocks if the buffer is full
                this.blockGrid.switchBlocks(
                    currentlyOver[0].getGridLocation(),
                    this.locationBuffer
                );
                this.locationBuffer = undefined;
                this.checkForTruthy();
            }
        }
    }

    update() {
        this.fpsText.update();

        this.timerText.setText(`Time: ${this.timeLimitInSeconds}`);
    }

    evaluateBooleanExpression(blocks: BooleanBlock[]): boolean {
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
            return Boolean(new Function("return " + expression + ";")());
        } catch (error) {
            console.error("Error evaluating expression", error);
            return false;
        }
    }

    checkForTruthy(): { type: "row" | "column"; index: number } | null {
        for (let row = 0; row < this.blockGrid.blockMatrix.length; row++) {
            if (
                this.evaluateBooleanExpression(this.blockGrid.blockMatrix[row])
            ) {
                console.log("Truthy statement found in row ${row}");
                return { type: "row", index: row };
            }
        }

        for (let col = 0; col < this.blockGrid.blockMatrix.length; col++) {
            let columnBlocks = this.blockGrid.blockMatrix.map(
                (row) => row[col]
            );
            if (this.evaluateBooleanExpression(columnBlocks)) {
                console.log("Truthy statement found in column ${col}");
                return { type: "column", index: col };
            }
        }

        return null;
    }
}
