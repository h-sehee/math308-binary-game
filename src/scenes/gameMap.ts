import Phaser from "phaser";

export default class GameMap extends Phaser.Scene {
    constructor() {
        super({ key: "game-map" });
    }

    preload() {}

    create() {
        const backgroundImage = this.add
            .image(0, 0, "game-map")
            .setOrigin(0, 0);
        backgroundImage.setScale(
            this.cameras.main.width / backgroundImage.width,
            this.cameras.main.height / backgroundImage.height
        );
        //this.add.image(400, 300, "game-map");

        // Start level on level click
        // Level 0:
        const level0Button = this.add.image(190, 540, "level0-button");
        level0Button.setScale(0.25);

        level0Button.setInteractive();

        level0Button.on("pointerup", () => {
            this.scene.start("Level0");
        });

        // Level 1:
        const level1Button = this.add.image(455, 377, "level1-button");
        level1Button.setScale(0.25);

        level1Button.setInteractive();

        level1Button.on("pointerup", () => {
            this.scene.start("MainScene");
        });
    }

    update() {}
}
