import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("startBackground", "assets/startBackground.png");
        this.load.image("startBtn", "assets/startBtn.png");
        this.load.image("wizard", "assets/cultistIdle.png");
        this.load.image("platform", "assets/dungeonFloor.png");
    }

    create() {
        this.scene.start("StartScene");
    }
}
