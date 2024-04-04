import Phaser from "phaser";

export default class LevelScene extends Phaser.Scene {
    backButton: Phaser.GameObjects.Text;

    level1: Phaser.GameObjects.Text;
    level2: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "LevelScene" });
    }

    create() {
        /* ---------------     BACKGROUND COLOUR    ------------------- */
        this.cameras.main.setBackgroundColor("#08142A");
        /* ---------------     BACK BUTTON    ------------------- */
        this.backButton = this.add
            .text(400, 300, "Back", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateBackClicked();
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.backButton);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.backButton);
            });
        /* ---------------     LEVEL 1    ------------------- */
        this.level1 = this.add
            .text(400, 400, "level1", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked(this.level1);
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level1);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level1);
            });
        /* ---------------     LEVEL 2    ------------------- */
        this.level2 = this.add
            .text(400, 500, "level2", { color: "#0f0" })
            .setInteractive()
            .on("pointerdown", () => {
                this.updateLevelClicked(this.level2);
            })
            .on("pointerover", () => {
                this.enterButtonHoverState(this.level2);
            })
            .on("pointerout", () => {
                this.enterButtonRestState(this.level2);
            });
    }

    updateBackClicked() {
        this.scene.start("MainScene");
    }

    updateLevelClicked(level: Phaser.GameObjects.Text) {
        this.scene.start(level.text + "Scene");
    }

    enterButtonHoverState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState(button: Phaser.GameObjects.Text) {
        button.setStyle({ fill: "#0f0" });
    }

    update() {}
}