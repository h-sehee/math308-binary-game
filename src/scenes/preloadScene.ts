import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("base_tiles", "assets/tileset.png");
        this.load.tilemapTiledJSON("tilemap", "assets/dungeon_background.json");

        this.load.atlas("faune", "assets/fauna.png", "assets/fauna.json");
        this.load.image("sword", "assets/sword_normal.png");
    }

    create() {
        this.scene.start("MainScene");
    }
}
