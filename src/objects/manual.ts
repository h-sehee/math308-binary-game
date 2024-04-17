import Phaser from "phaser";

export default class Manual extends Phaser.GameObjects.Sprite {
    manualText: string;
    manualOpen: boolean;
    manualContainer: Phaser.GameObjects.Container;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
        super(scene, x, y, "ClosedBook");
        this.scene = scene;
        this.manualText = text;
        this.manualOpen = false;

        // Adding the sprite to the scene and scaling it down
        this.scene.add.existing(this);
        this.setScale(0.3); // Scale down the sprite
        this.setInteractive({ cursor: "pointer" });

        // Handling hover events
        this.on("pointerover", () => {
            this.setTexture("HoveredBook");
            this.setScale(0.35); // Scale up a bit when hovered
        });

        this.on("pointerout", () => {
            if (!this.manualOpen) {
                this.setTexture("ClosedBook");
                this.setScale(0.3); // Return to original scaled down size
            }
        });

        // Handling click events
        this.on("pointerdown", () => {
            this.manualOpen = !this.manualOpen;
            this.setTexture(this.manualOpen ? "OpenBook" : "HoveredBook");
            this.manualContainer.setVisible(this.manualOpen);
            if (this.manualOpen) {
                this.displayManual();
            }
        });

        // Create a container for manual text right under the book
        this.manualContainer = this.scene.add.container(x, y + 100);
        let background = this.scene.add
            .rectangle(30, 170, 200, 400, 0xaaaaaa) // Same larger size and grey background
            .setStrokeStyle(2, 0xffff00); // Yellow border
        this.manualContainer.add(background);
        let textObject = this.scene.add.text(-190, -140, this.manualText, {
            font: "16px 'Courier New'",
            color: "#000",
            wordWrap: { width: 380 },
        });
        this.manualContainer.add(textObject);
        this.manualContainer.setVisible(false);
    }

    displayManual() {
        // Optional: Animate the text box expansion if desired
        this.scene.tweens.add({
            targets: this.manualContainer.list,
            scaleY: 1, // Grow only vertically, if desired
            scaleX: 1,
            duration: 300,
            ease: "Power2",
        });
        this.manualContainer.setVisible(true);
    }

    setManualText(newText: string) {
        this.manualText = newText;
        (this.manualContainer.list[1] as Phaser.GameObjects.Text).setText(
            newText
        );
    }
}
