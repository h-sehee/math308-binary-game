import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    /* ---------------     START BUTTON    ------------------- */
    startClicked: boolean;
    startButton: Phaser.GameObjects.Text;
    /* ---------------     OPTION BUTTON    ------------------- */
    optionsClicked: boolean;
    optionsButton: Phaser.GameObjects.Text;
    /* ---------------     PLAY BUTTON    ------------------- */
    playClicked: boolean;
    playButton: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        /* ---------------     START BUTTON    ------------------- */
        this.startClicked = false;
        this.startButton = this.add
            .text(400, 300, "Start", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => this.updateStartClicked(true))
            .on("pointerover", () =>
                this.enterButtonHoverState(this.startButton)
            )
            .on("pointerout", () =>
                this.enterButtonRestState(this.startButton)
            );

        /* ---------------     OPTIONS BUTTON    ------------------- */
        this.optionsClicked = false;
        this.optionsButton = this.add
            .text(400, 400, "Options", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => this.updateOptionsClicked(true))
            .on("pointerover", () =>
                this.enterButtonHoverState(this.optionsButton)
            )
            .on("pointerout", () =>
                this.enterButtonRestState(this.optionsButton)
            );

        /* ---------------     PLAY BUTTON    ------------------- */
        this.playClicked = false;
        this.playButton = this.add
            .text(400, 500, "Play", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => this.updatePlayClicked(true))
            .on("pointerover", () =>
                this.enterButtonHoverState(this.playButton)
            )
            .on("pointerout", () => this.enterButtonRestState(this.playButton));
    }

    /* ---------------     START BUTTON    ------------------- */
    updateStartClicked(value: boolean) {
        this.startClicked = value;
    }

    enterButtonHoverState(value: Phaser.GameObjects.Text) {
        value.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(value: Phaser.GameObjects.Text) {
        value.setStyle({ fill: "#0f0" });
    }

    /* ---------------     OPTIONS BUTTON    ------------------- */
    updateOptionsClicked(value: boolean) {
        this.optionsClicked = value;
    }

    /* ---------------     PLAY BUTTON    ------------------- */
    updatePlayClicked(value: boolean) {
        this.playClicked = value;
    }

    update() {}
}
