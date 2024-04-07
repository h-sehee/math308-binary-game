import Phaser from "phaser";
import BlockGrid from "../objects/blockGrid";
import FpsText from "../objects/fpsText";
import BooleanBlock from "../objects/booleanBlock";
import ScoreDisplay from "../objects/scoreDisplay";

export default class FiveByFiveLevel extends Phaser.Scene {
    fpsText: FpsText;
    locationBuffer: [number, number] | undefined;
    blockGrid: BlockGrid;
    timer: Phaser.Time.TimerEvent;
    timeLimitInSeconds: number = 120;
    timerText: Phaser.GameObjects.Text;
    gameplayMusic: Phaser.Sound.BaseSound;
    scoreDisplay: ScoreDisplay;

    constructor() {
        super({ key: "FiveByFiveLevel" });
    }

    create() {
        this.blockGrid = new BlockGrid(this, 5);
        this.fpsText = new FpsText(this);
        this.gameplayMusic = this.sound.add("gameplay-music");
        this.gameplayMusic.play({ volume: 0.3 });
        this.scoreDisplay = new ScoreDisplay(this, 620, 30);

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
                    this.gameplayMusic.stop();
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
            if (this.locationBuffer == undefined) {
                this.locationBuffer = currentlyOver[0].getGridLocation();
            } else {
                let promises: Array<Promise<void>> =
                    this.blockGrid.switchBlocks(
                        currentlyOver[0].getGridLocation(),
                        this.locationBuffer
                    );
                this.locationBuffer = undefined;
                Promise.all(promises).then(() => {
                    const matches: number = this.blockGrid.checkForTruthy();
                    this.scoreDisplay.incrementScore(matches);
                });
            }
        }
    }

    update() {
        this.fpsText.update();

        this.timerText.setText(`Time: ${this.timeLimitInSeconds}`);
    }
}
