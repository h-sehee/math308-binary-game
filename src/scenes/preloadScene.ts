import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");

        // Loadout Menu Screen background
        this.load.image("LoadoutMenu", "assets/img/LoadoutMenu.jpg");
    }

    create() {
        this.scene.start("LoadoutSceneOne");
    }
}
