import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("tiles", "assets/tiles/tilemap.png");
        this.load.tilemapTiledJSON("lobby", "assets/tilemaps/lobby_room.json");
        this.load.spritesheet("player", "assets/player/hunter_walk_anim.png", {
            frameWidth: 64,
            frameHeight: 116,
        });
    }

    create() {
        this.scene.start("TitleScene");
    }
}
