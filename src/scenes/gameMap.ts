import Phaser from "phaser";

export default class GameMap extends Phaser.Scene {
    constructor() {
        super({ key: "game-map" });
    }

    preload() {
        this.load.image("game-map", "assets/game-map.png");
        this.load.image("level0-button", "assets/level0-button.png");
        this.load.image("level1-button", "assets/level1-button.png");
        this.load.image("level2-button", "assets/level2-button.png");
        this.load.image("level3-button", "assets/level3-button.png");
    }

    create() {
        const backgroundImage = this.add
            .image(0, 0, "game-map")
            .setOrigin(0, 0);
        backgroundImage.setScale(
            this.cameras.main.width / backgroundImage.width,
            this.cameras.main.height / backgroundImage.height
        );
        //this.add.image(400, 300, "game-map");

        const originalScale = 0.55;
        const hoverScale = 0.58;

        // Level 0 Button:
        const level0Button = this.add.image(180, 552, "level0-button");

        level0Button.setScale(originalScale);
        level0Button.setInteractive();

        level0Button.on("pointerup", () => {
            this.scene.start("Level0");
        });

        // Change scale on hover
        level0Button.on("pointerover", () => {
            this.tweens.add({
                targets: level0Button,
                scaleX: hoverScale,
                scaleY: hoverScale,
                duration: 100, // Duration of the tween in milliseconds
                ease: "Linear", // Easing function for the tween
            });
        });

        // Restore original scale when pointer leaves
        level0Button.on("pointerout", () => {
            this.tweens.add({
                targets: level0Button,
                scaleX: originalScale,
                scaleY: originalScale,
                duration: 100, // Duration of the tween in milliseconds
                ease: "Linear", // Easing function for the tween
            });
        });

        // Level 1 Button:
        const level1Button = this.add.image(410, 346, "level1-button");
        level1Button.setScale(0.55);

        level1Button.setInteractive();

        level1Button.on("pointerup", () => {
            this.scene.start("MainScene");
        });

        // Level 2 Button:
        const level2Button = this.add.image(782, 457, "level2-button");
        level2Button.setScale(0.55);

        // Level 3 Button:
        const level3Button = this.add.image(1096, 266, "level3-button");
        level3Button.setScale(0.55);
    }

    update() {}
}
