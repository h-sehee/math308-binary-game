import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("base_tiles", "assets/tileset.png");
        this.load.tilemapTiledJSON("tilemap", "assets/background.json");

        this.load.atlas(
            "faune",
            "assets/characters/fauna.png",
            "assets/characters/fauna.json"
        );

        this.load.atlas("chest", "assets/chest.png", "assets/chest.json");
    }

    create() {
        this.scene.start("MainScene");
    }
}
