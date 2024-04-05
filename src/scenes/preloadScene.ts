import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //Loading images for the levels
        this.load.image("WildWest", "assets/img/WildWest.jpeg");
        this.load.image(
            "levelBackg",
            "assets/img/LevelImg/level_background.jpg"
        );
        this.load.image("ground", "assets/img/LevelImg/ground.png");
        this.load.image("platform", "assets/img/LevelImg/platform.png");
        //this.load.image("tiles", "assets/img/tilemap_packed.png");
        //this.load.tilemapTiledJSON("tilemap", "assets/levelOneMap.json");
        //Charicters, rewards, enamys
        this.load.image("baddie1", "assets/img/LevelImg/baddie_1.png");
        this.load.image("checkpoint", "assets/img/LevelImg/checkpoint.png");
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
        // Start First Scene

        this.scene.launch("LoadoutSceneTextboxInserts");
        this.scene.start("LoadoutSceneOne");
        //this.scene.start("LoadoutSceneTextboxInserts");
        //this.scene.start("levelOne");
        //this.scene.start("LoadoutSceneTextboxTest");
    }
}
