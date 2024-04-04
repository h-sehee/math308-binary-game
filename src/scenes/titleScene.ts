import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
    clickCountText: Phaser.GameObjects.Text;
    clickButton: Phaser.GameObjects.Text;
    constructor() {
        super({ key: "TitleScene" });
    }

    init() {}

    preload() {}

    create() {
        this.add.image(640, 360, "titlescreen");

        this.clickButton = this.add
            .text(610, 440, "Start", { color: "#fff", fontSize: "25px" })
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("LevelSelect");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState();
            })
            .on("pointerout", () => {
                this.enterButtonRestState();
            });
    }

    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: "#ff0" });
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: "#fff" });
    }

    update() {}
}
