import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("background", "assets/img/background.jpg");
        //this.load.text
    }

    create() {
        this.scene.start("MainScene");
    }
}
