import Phaser from "phaser";

export default class MazeMap extends Phaser.Scene {
    private usedThreads: number;
    private previous: string;

    constructor() {
        super({ key: "maze-map" });
    }

    init(data: { threads: number; currentScene: string }) {
        this.usedThreads = 5 - data.threads;
        this.previous = data.currentScene;
    }

    create() {
        this.add
            .rectangle(
                this.cameras.main.width - 380,
                this.cameras.main.height - 100,
                this.cameras.main.width * 0.5,
                this.cameras.main.height * 0.5,
                0x333333,
                1
            )
            .setOrigin(0, 1)
            .setDepth(1005);

        // this.add
        //     .image(
        //         this.cameras.main.width - 380,
        //         this.cameras.main.height - 100,
        //         "BlackFrame"
        //     )
        //     .setDepth(1000)
        //     .setScale(5);

        // Close button that will return to the game screen
        const close = this.add
            .text(this.cameras.main.width - 125, 95, "X", {
                fontSize: "22px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 6,
                stroke: "0xffffff",
                //strokeAlpha: 1
            })
            .setOrigin(0.5)
            .setDepth(1005);

        close.setInteractive();
        close.on("pointerover", () => {
            close.setFontSize("27px");
        });
        close.on("pointerout", () => {
            close.setFontSize("25px");
        });
        close.on("pointerdown", () => {
            this.scene.stop();
            this.scene.resume(this.previous);
        });

        this.input.keyboard?.on("keydown-M", () => {
            this.scene.stop();
            this.scene.resume(this.previous);
        });
    }
}
