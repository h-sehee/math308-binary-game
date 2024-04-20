import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("base_tiles", "assets/extruded_tileset.png");
        this.load.tilemapTiledJSON("tilemap", "assets/background.json");

        this.load.atlas(
            "faune",
            "assets/characters/fauna.png",
            "assets/characters/fauna.json"
        );

        this.load.atlas("chest", "assets/chest.png", "assets/chest.json");

        this.load.image("paper", "assets/paper.png");
        this.load.image("scroll", "assets/scroll_closed.png");
        this.load.image("message-box", "assets/message_box_1.png");
        this.load.image("pollev", "assets/pollev-icon.png");
        this.load.image("ascii", "assets/ascii.png");
        this.load.image("cloud", "assets/clouds/clouds5.png");
    }

    create() {
        this.scene.start("MainScene");
    }
}
