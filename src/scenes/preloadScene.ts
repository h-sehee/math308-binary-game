import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("title-screen", "assets/title-screen.png");
        this.load.image("play-button", "assets/play-button.png");
    }

    create() {
        this.scene.start("title-screen");
    }
}
