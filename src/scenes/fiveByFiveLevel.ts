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
    timeLimitInSeconds: number;
    timerText: Phaser.GameObjects.Text;
    gameplayMusic: Phaser.Sound.BaseSound;
    scoreDisplay: ScoreDisplay;
    reshuffleButton: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "FiveByFiveLevel" });
    }

    preload() {
        // Preload assets if not done in PreloadScene, otherwise this is not needed
    }

    create() {
        this.timeLimitInSeconds = 120;
        this.blockGrid = new BlockGrid(this, 5);
        this.fpsText = new FpsText(this);
        this.gameplayMusic = this.sound.add("gameplay-music");
        this.gameplayMusic.play({ volume: 0.3, loop: true });
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
            delay: 1000,
            callback: () => {
                this.timeLimitInSeconds--;
                if (this.timeLimitInSeconds <= 0) {
                    this.gameplayMusic.stop();
                    this.scene.start("PostLevelScene", {
                        finalScore: this.scoreDisplay.getScore(),
                    });
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

        this.reshuffleButton = this.add
            .text(100, 50, "Reshuffle", { color: "#000000" })
            .setInteractive();
        this.reshuffleButton.on("pointerdown", this.reshuffleBlocks, this);

        // Create break animations
        this.createBreakAnimations();
    }

    // Function to create break animations
    private createBreakAnimations() {
        const breakConfig = {
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        };

        // Animation creation for each color
        this.anims.create({
            key: "greenBreak",
            frames: this.anims.generateFrameNumbers("green-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
        // Repeat for other colors
        this.anims.create({
            key: "redBreak",
            frames: this.anims.generateFrameNumbers("red-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "yellowBreak",
            frames: this.anims.generateFrameNumbers("yellow-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "blueBreak",
            frames: this.anims.generateFrameNumbers("blue-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "purpleBreak",
            frames: this.anims.generateFrameNumbers("purple-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
    }

    mouseClick(
        pointer: Phaser.Input.Pointer,
        currentlyOver: Array<Phaser.GameObjects.GameObject>
    ) {
        if (currentlyOver[0] instanceof BooleanBlock) {
            const currentLocation = currentlyOver[0].getGridLocation();
            if (this.locationBuffer == undefined) {
                this.locationBuffer = currentLocation;
            } else if (this.locationBuffer !== currentLocation) {
                let promises: Array<Promise<void>> =
                    this.blockGrid.switchBlocks(
                        currentLocation,
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

    reshuffleBlocks() {
        // Clear existing block grid
        this.blockGrid.destroy();

        // Generate new block grid with random blocks
        this.blockGrid = new BlockGrid(this, 5);
    }
}
