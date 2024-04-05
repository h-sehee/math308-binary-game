import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("titlescreen", "assets/CyberSpyTitleScreen.png");
        this.load.image("alfred", "assets/alfred.png");
        this.load.image("spy", "assets/spy.png");
        this.load.image("alfredicon", "assets/AlfredIcon.png");
        this.load.image("pin", "assets/pin.png");
        this.load.image("radar", "assets/radar.gif");
        this.load.image("shield", "assets/shield.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("sky", "assets/sky.png");
        this.load.image("star", "assets/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.image("closed_metal_door", "assets/closed_metal_door.png");
        this.load.image(
            "LevelSelectBackground",
            "assets/LevelSelectBackground.png"
        );
        this.load.image("open_metal_door", "assets/open_metal_door.png");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("forest", "assets/forest.jpg");
        this.load.image("matrix", "assets/matrix.png");
        this.load.image("evil", "assets/evil.jpg");
    }

    create() {
        this.scene.start("TitleScene");
    }
}
