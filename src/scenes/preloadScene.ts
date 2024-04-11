import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("plat_1", "assets/Art/mars_plat_1.png");
        this.load.image("space_bg", "assets/Art/space_bg.png");
        this.load.image("spikes", "assets/Art/spikes.png");
        this.load.image("star", "assets/Art/star.png");
        this.load.spritesheet("cat", "assets/Art/cat_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image("background_1", "assets/Art/background_1.png");
        this.load.image("planet-1", "assets/Art/planet-1.png");
        this.load.image("planet-4", "assets/Art/planet-4.png");
        this.load.spritesheet("button", "assets/Art/buttons.png", {
            frameWidth: 256,
            frameHeight: 64,
        });
        this.load.image("terminal", "assets/Art/CommTerminal.png");
    }

    create() {
        this.scene.start("MainScene");
    }
}
