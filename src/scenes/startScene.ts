import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
    startText: Phaser.GameObjects.Text;
    pauseButton: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "StartScene" });
    }

    create() {
        /* ---------------     BACKGROUND COLOUR    ------------------- */
        this.cameras.main.setBackgroundColor("#274E6C");

        /* ---------------     START TEXT    ------------------- */
        this.startText = this.add.text(200, 200, "In a world...", {
            color: "#0f0",
        });

        /* ---------------     PAUSE BUTTON    ------------------- */
        this.pauseButton = this.add
            .text(400, 400, "Pause", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updatePauseClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.pauseButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.pauseButton);
            });
    }

    updatePauseClicked() {
        this.scene.switch("PauseScene");
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {}
}