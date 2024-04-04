import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("base_tiles", "assets/tileset.png");
        this.load.tilemapTiledJSON("tilemap", "assets/dungeon_background.json");

        this.load.atlas("faune", "assets/fauna.png", "assets/fauna.json");
        this.load.image("sword", "assets/sword_normal.png");
        this.load.atlas(
            "swordSlash",
            "assets/swordSlash.png",
            "assets/swordSlash.json"
        );
        this.load.atlas(
            "skeleton_red_eyes",
            "assets/skeleton_red_eyes.png",
            "assets/skeleton_red_eyes.json"
        );
        this.load.image("heart-empty", "assets/ui_heart_empty.png");
        this.load.image("heart-full", "assets/ui_heart_full.png");
    }

    create() {
        this.scene.start("MainScene");
    }
}
