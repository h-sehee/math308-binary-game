import Phaser from "phaser";

export default class level1 extends Phaser.Scene {
    private levelText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "level1" });
    }

    preload() {
        this.load.image("background", "assets/img/background.png");
        this.load.image(
            "monkey-brown-pirate",
            "assets/img/monkeys/monkey-brown-pirate.png"
        );
    }

    create() {
        this.add.image(350, 360, "background");
        this.add.rectangle(640, 0, 1280, 150, 0x0000);
        this.levelText = this.add.text(545, 10, "Level 1", {
            fontSize: "48px",
        });
        this.add.rectangle(1000, 250, 600, 350, 0xffff);
        this.add.rectangle(1000, 650, 600, 450, 0x9999);

        this.add.image(350, 325, "monkey-brown-pirate");

        this.add.text(720, 100, "class Monkey:", {
            fontSize: "42px",
            color: "black",
        });

        this.add.text(750, 175, "color:", {
            fontSize: "32px",
            color: "black",
        });
        this.add.text(750, 250, "hat:", {
            fontSize: "32px",
            color: "black",
        });
    }

    update() {}
}
