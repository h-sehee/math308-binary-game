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
            .setDepth(999);

        // // Close button that will return to the game screen
        // const close = this.add
        //     .text(this.cameras.main.width - 20, 20, "X", {
        //         fontSize: "25px",
        //         fontFamily: "Academy Engraved LET",
        //         strokeThickness: 6,
        //         stroke: "0xffffff",
        //         //strokeAlpha: 1
        //     })
        //     .setOrigin(0.5)
        //     .setDepth(1000);

        // close.setInteractive();
        // close.on("pointerover", () => {
        //     close.setFontSize("27px");
        // });
        // close.on("pointerout", () => {
        //     close.setFontSize("25px");
        // });
        // close.on("pointerdown", () => {
        //     this.scene.stop();
        //     //this.scene.resume(this.previous, { itemList: this.itemList });
        // });
        // let isMapUp: boolean = true;
        // this.input.keyboard?.on("keydown-M", () => {
        //     if (isMapUp) {
        //         this.scene.stop();
        //         isMapUp = false;
        //     } else {
        //         this.scene.resume("maze-map");
        //         isMapUp = true;
        //     }
        // });
        // this.input.keyboard?.on("keydown-M", () => {
        //     this.scene.stop();
        //     //this.scene.resume(this.previous, { itemList: this.itemList });
        // });

        this.input.keyboard?.on("keydown-M", () => {
            this.scene.stop();
            this.scene.resume(this.previous);
        });
    }
}
