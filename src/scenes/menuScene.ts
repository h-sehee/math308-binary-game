import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    playButton: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "MenuScene" });
    }

    create() {
        this.add.image(640, 360, "menu-backplate");
        this.playButton = new Phaser.GameObjects.Image(
            this,
            640,
            300,
            "play-button"
        );
        this.playButton
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", this.clickPlay, this);
        this.add.existing(this.playButton);
    }

    clickPlay() {
        this.sound.play("button-press");
        this.scene.start("MainScene");
    }
}
