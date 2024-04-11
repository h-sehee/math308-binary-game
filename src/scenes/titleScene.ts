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
        let menuMusic = this.sound.add("menuMusic", { loop: false });
        menuMusic.play();
        menuMusic.setSeek(10);
        this.add.image(640, 360, "titlescreen");

        this.clickButton = this.add
            .text(515, 440, "[Enter] to Start", {
                color: "#fff",
                fontSize: "25px",
                fontFamily: "Monospace",
            })
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("LoginScene");
            })
            .on("pointerover", () => {
                this.enterButtonHoverState();
            })
            .on("pointerout", () => {
                this.enterButtonRestState();
            });

        this.input.keyboard?.once("keydown-ENTER", () => {
            this.scene.start("LoginScene");
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
