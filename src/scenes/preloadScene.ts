import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("background", "assets/img/background.jpg");
        //this.load.image("maze", "assets/img/maze.jpeg");
        //this.load.image("Minotaur", "assets/img/Minotaur.jpg");
        this.load.image("base_tiles", "assets/tileset.png");
        this.load.tilemapTiledJSON("tilemap", "assets/maze_background.json");

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

        //Load the music for the titleScene
        this.load.audio("titleScene", ["assets/Music/titleScene.mp3"]);

        this.load.image("threads", "assets/threads.png");
        this.load.image("weaponBox", "assets/weaponBox.png");
        this.load.atlas("bow", "assets/bow.png", "assets/bow.json");
        this.load.image("arrow", "assets/arrow.png");
        this.load.image("next-button", "assets/next_button.png");
    }

    create() {
        this.scene.start("TitleScene");
    }
}
