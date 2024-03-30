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
            525,
            "play-button"
        );
        playButton.setScale(0.42);

        playButton.setInteractive();

        const originalScale = playButton.scaleX;
        const hoverScale = originalScale * 1.05;

        // Change scale on hover
        playButton.on("pointerover", () => {
            playButton.setScale(hoverScale);
        });

        // Restore original scale when pointer leaves
        playButton.on("pointerout", () => {
            playButton.setScale(originalScale);
        });

        playButton.on("pointerup", () => {
            this.scene.start("game-map");
        });
    }

    update() {}
}
