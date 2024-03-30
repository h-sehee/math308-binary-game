import Phaser from "phaser";

export default class TitleScreen extends Phaser.Scene {
    constructor() {
        super({ key: "title-screen" });
    }

    preload() {}

    create() {
        const backgroundImage = this.add
            .image(0, 0, "title-screen")
            .setOrigin(0, 0);
        backgroundImage.setScale(
            this.cameras.main.width / backgroundImage.width,
            this.cameras.main.height / backgroundImage.height
        );
        //this.add.image(400, 300, "title-screen");

        // Go to levels map on play button click
        const playButton = this.add.image(
            this.cameras.main.width / 2,
            510,
            "play-button"
        );
        playButton.setScale(0.42);

        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start("MainScene");
        });
    }

    update() {}
}
