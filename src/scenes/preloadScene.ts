import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("tiles", "assets/tiles/tilemap.png");
        this.load.tilemapTiledJSON("lobby", "assets/tilemaps/lobby_room.json");
    }

    create() {
        this.scene.start("TitleScene");
    }
}
