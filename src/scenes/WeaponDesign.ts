import Phaser from "phaser";

export default class WeaponDesign extends Phaser.Scene {
    constructor() {
        super({ key: "weapon-design" });
    }

    create() {
        this.add
            .rectangle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                this.cameras.main.width * 0.9,
                this.cameras.main.height * 0.9,
                0xffffff,
                0.85
            )
            .setOrigin(0.5)
            .setDepth(999);

        const resume = this.add
            .text(this.cameras.main.width - 20, 20, "X", {
                fontSize: "25px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 6,
                stroke: "0xffffff",
                //strokeAlpha: 1
            })
            .setOrigin(0.5)
            .setDepth(1000);

        resume.setInteractive();
        resume.on("pointerover", () => {
            resume.setFontSize("27px");
        });
        resume.on("pointerout", () => {
            resume.setFontSize("25px");
        });
        resume.on("pointerdown", () => {
            this.scene.stop();
            this.scene.resume("mainScene");
        });
        this.input.keyboard?.on("keydown-E", () => {
            this.scene.stop();
            this.scene.resume("mainScene");
        });
    }
}
