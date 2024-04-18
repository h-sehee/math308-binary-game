import Phaser from "phaser";

export default class SecurityBreachScene extends Phaser.Scene {
    private text: Phaser.GameObjects.Text;
    private backgroundColor: string;
    private textColor: string;
    private borderStyle: string;
    private timer: Phaser.Time.TimerEvent;
    constructor() {
        super({ key: "SecurityBreachScene" });
    }

    create() {
        // Set initial colors
        this.backgroundColor = "#FF0000"; // red
        this.textColor = "#000000"; // black
        this.borderStyle = "4px solid #000000"; // black border

        // Create text with border
        this.text = this.add
            .text(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                "SECURITY BREACH DETECTED",
                {
                    font: "bold 48px Arial",
                    color: this.textColor,
                    backgroundColor: this.backgroundColor,
                    padding: {
                        x: 20,
                        y: 10,
                    },
                }
            )
            .setOrigin(0.5);

        this.text.setStroke("#000000", 4); // Initial border color

        // Timer for color change
        this.timer = this.time.addEvent({
            delay: 333, // changes color every third of a second
            callback: this.toggleColors,
            callbackScope: this,
            loop: true,
        });

        // Scene transition after 3 seconds
        this.time.delayedCall(3000, () => {
            this.scene.start("LevelSelect");
        });
    }

    toggleColors() {
        if (this.backgroundColor === "#FF0000") {
            this.backgroundColor = "#000000"; // black
            this.textColor = "#FF0000"; // red
            this.borderStyle = "4px solid #FF0000"; // red border
        } else {
            this.backgroundColor = "#FF0000"; // red
            this.textColor = "#000000"; // black
            this.borderStyle = "4px solid #000000"; // black border
        }
        this.text.setColor(this.textColor);
        this.text.setBackgroundColor(this.backgroundColor);
        this.text.setStroke(this.borderStyle, 4);
    }
}
