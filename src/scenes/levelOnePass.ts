import Phaser from "phaser";

export default class levelOnePass extends Phaser.Scene {
    constructor() {
        super({ key: "levelOnePass", active: false });
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);
        // Add a semi-transparent background rectangle to dim the game scene
        const background = this.add.rectangle(
            0,
            0,
            screenWidth,
            screenHeight,
            0x000000,
            0.5
        );
        background.setOrigin(0, 0);

        // Add popup content
        const popupText = this.add.text(
            screenWidth / 2,
            screenHeight / 2,
            "You Passed!",
            { fontSize: "32px", color: "#fff" }
        );
        popupText.setOrigin(0.5);

        // make buttons to change to level two
        this.add.image(700, 200, "duck").setScale(0.6);
        this.add.image(550, 200, "duck").setScale(0.6);

        const nextLevel = this.add
            .text(500, 500, "Next Level", {
                color: "#ffffff",
                fontSize: "32px",
                fixedWidth: 425,
                backgroundColor: "#87ceeb",
            })
            .setPadding(32)
            .setOrigin(0.2);

        nextLevel.setInteractive({ useHandCursor: true });

        console.log("attaching listener to button");
        nextLevel.on("pointerdown", () => {
            console.log("Button clicked!");
            this.scene.start("levelTwo");
        });
    }
}
