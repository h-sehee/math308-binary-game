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
        this.load.image("spyicon", "assets/SpyIcon.png");
        this.load.image("pin", "assets/pin.png");
        this.load.image("radar", "assets/radar.gif");
        this.load.image("shield", "assets/shield.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("prompt", "assets/PromptBox.png");

        this.load.image("closed_metal_door", "assets/closed_metal_door.png");
        this.load.image("lockedDoor", "assets/lockedDoor.png");
        this.load.image("arrow", "assets/arrow.png");
        this.load.image("backwardsDoor", "assets/backwardsDoor.png");
        this.load.image("wallDoor", "assets/wallDoor.png");

        this.load.image(
            "LevelSelectBackground",
            "assets/LevelSelectBackground.png"
        );
        this.load.image("Level1Background", "assets/Level1Background.png");
        this.load.image("open_metal_door", "assets/open_metal_door.png");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("agent", "path/to/agent09.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.image("forest", "assets/forest.jpg");
        this.load.image("matrix", "assets/matrix.png");
        this.load.image("evil", "assets/evil.jpg");

        this.load.audio("ding", ["assets/ding.mp3"]);
        this.load.audio("cdDing", ["assets/cdDing.mp3"]);
        this.load.audio("lsDing", ["assets/lsDing.mp3"]);
        this.load.audio("cdBackDing", ["assets/cdBackDing.mp3"]);
        this.load.audio("manDing", ["assets/manDing.mp3"]);
        this.load.audio("menuMusic", ["assets/menuMusic.mp3"]);
        this.load.audio("alfredDeathMusic", ["assets/alfredDeathMusic.mp3"]);
    }

    create() {
        this.scene.start("TitleScene");
    }
}
