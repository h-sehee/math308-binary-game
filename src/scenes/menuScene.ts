import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
    }

    create() {
        // Original button leads to 5 x 5 grid
        const originalButton = this.createButton(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "Play Boolean Bonanza 5 x 5",
            "MainScene"
        );

        // Button above the original leads to Tutorial
        this.createButton(
            originalButton.x,
            originalButton.y - originalButton.height - 20,
            "Tutorial",
            "AnotherScene" // Specify the scene key for the button
        );

        // Button below the original leads to 3 x 3 grid
        this.createButton(
            originalButton.x,
            originalButton.y + originalButton.height + 20,
            "Play Boolean Bonanza 3 x 3",
            "YetAnotherScene" // Specify the scene key for the button
        );
    }

    createButton(x: number, y: number, buttonText: string, sceneKey: string) {
        const rectangle = this.add
            .rectangle(x, y, 200, 50, 0x000000)
            .setInteractive()
            .on("pointerdown", () => this.scene.start(sceneKey)); // Start the scene based on the provided key

        const fontSize = 24; // Adjust the font size as needed
        const text = this.add
            .text(
                rectangle.x, // Center horizontally within rectangle
                rectangle.y, // Center vertically within rectangle
                buttonText,
                { color: "#FFFFFF", fontSize: fontSize + "px", align: "center" }
            )
            .setOrigin(0.5);

        text.setDepth(1);
        rectangle.setSize(text.width + 20, text.height + 10); // Adjust rectangle size based on text size

        text.setInteractive().on("pointerdown", () =>
            this.scene.start(sceneKey)
        );

        return rectangle;
    }
}
