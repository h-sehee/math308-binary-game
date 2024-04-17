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

        // Adding the sprite to the scene
        this.scene.add.existing(this);
        this.setInteractive({ cursor: "pointer" });

        // Handling hover events
        this.on("pointerover", () => {
            this.setTexture("HoveredBook");
            this.setScale(1.1); // Grow a bit when hovered
        });

        this.on("pointerout", () => {
            if (!this.manualOpen) {
                this.setTexture("ClosedBook");
                this.setScale(1.0); // Return to normal scale
            }
        });

        // Handling click events
        this.on("pointerdown", () => {
            if (this.manualOpen) {
                this.setTexture("HoveredBook");
                this.manualOpen = false;
                this.manualContainer.setVisible(false);
            } else {
                this.setTexture("OpenBook");
                this.manualOpen = true;
                this.displayManual();
            }
        });

        // Create a container for manual text
        this.manualContainer = this.scene.add.container(x, y + 100);
        this.manualContainer.add(
            this.scene.add.rectangle(0, 0, 400, 300, 0xffffff)
        );
        this.manualContainer.add(
            this.scene.add.text(-190, -140, this.manualText, {
                font: "16px Arial",
                color: "#000",
                wordWrap: { width: 380 },
            })
        );
        this.manualContainer.setVisible(false);
    }

    displayManual() {
        this.manualContainer.setVisible(true);
    }

    setManualText(newText: string) {
        this.manualText = newText;
        (this.manualContainer.list[1] as Phaser.GameObjects.Text).setText(
            newText
        );
    }
}
