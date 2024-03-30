import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("title-screen", "assets/title-screen.png");
        this.load.image("play-button", "assets/play-button.png");
        this.load.image("game-map", "assets/game-map.png");
        this.load.image("level0-button", "assets/level0-button.png");
        this.load.image("level1-button", "assets/level1-button.png");
        this.load.image("square", "assets/square.png");
    }

    create() {
        this.scene.start("title-screen");
    }
}
