import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {

    /* ---------------     START BUTTON    ------------------- */
    startButton: Phaser.GameObjects.Text;
    /* ---------------     OPTION BUTTON    ------------------- */
    optionsButton: Phaser.GameObjects.Text;
    /* ---------------     PLAY BUTTON    ------------------- */
    playButton: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        /* ---------------     BACKGROUND COLOUR    ------------------- */
        this.cameras.main.setBackgroundColor("#702963");
        /* ---------------     START BUTTON    ------------------- */
        this.startButton = this.add
            .text(400, 300, "Start", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateStartClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.startButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.startButton);
            });

        /* ---------------     OPTIONS BUTTON    ------------------- */
        this.optionsButton = this.add
            .text(400, 400, "Options", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateOptionsClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.optionsButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.optionsButton);
            });

        /* ---------------     PLAY BUTTON    ------------------- */
        this.playButton = this.add
            .text(400, 500, "Play From Level", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updatePlayClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.playButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.playButton);
            });
    }

    /* ---------------     START BUTTON    ------------------- */
    updateStartClicked() {
        this.scene.start("StartScene");
    }

    enterButtonHoverState(value: Phaser.GameObjects.Text) {
        value.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(value: Phaser.GameObjects.Text) {
        value.setStyle({ fill: "#0f0" });
    }

    /* ---------------     OPTIONS BUTTON    ------------------- */
    updateOptionsClicked() {
        this.scene.start("OptionsScene");
    }

    /* ---------------     PLAY BUTTON    ------------------- */
    updatePlayClicked() {
        this.scene.start("LevelScene");
    }
    update() {}
}
