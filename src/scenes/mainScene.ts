import Phaser from "phaser";
import BlockGrid from "../objects/blockGrid";
import FpsText from "../objects/fpsText";
import BooleanBlock from "../objects/booleanBlock";

export default class MainScene extends Phaser.Scene {
    fpsText: FpsText;
    locationBuffer: [number, number] | undefined;
    blockGrid: BlockGrid;

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
            }
        }
    }

    update() {
        this.fpsText.update();
    }
}
