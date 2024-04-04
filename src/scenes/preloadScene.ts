import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("grass", "assets/img/grass.png");
        this.load.image("trainGrounds", "assets/img/trainGrounds.png");
    }

    create() {
        this.scene.start("MainScene");
    }
}
