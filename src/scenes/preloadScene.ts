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
        this.load.image("ground", "assets/img/LevelImg/ground.jpd");
        this.load.image("platform", "assets/img/LevelImg/platform.jpg");

        //Charicters, rewards, enamys
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
        //this.scene.start("levelOne");
    }
}
