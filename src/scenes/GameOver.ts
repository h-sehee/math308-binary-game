import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }

    create() {
        this.scene.stop("game-ui");
    }
}
