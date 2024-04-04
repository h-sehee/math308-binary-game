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
    }

    create() {
        this.scene.start("Level_1_scene");
    }
}
