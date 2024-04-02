import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("WildWest", "assets/img/WildWest.jpeg");
        this.load.image("ground", "assets/img/platform.png");
        this.load.image("star", "assets/img/star.png");
        this.load.image("bomb", "assets/img/bomb.png");
        this.load.spritesheet("dude", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });

        // Loadout Menu Screen background
        this.load.image("LoadoutMenu", "assets/img/LoadoutMenu.jpg");
    }

    create() {
        this.scene.start("LoadoutSceneOne");
        //this.scene.start("LoadoutScene");
        this.scene.start("levelOne");
    }
}
