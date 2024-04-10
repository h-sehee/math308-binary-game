import Phaser from "phaser";

export default class level1 extends Phaser.Scene {
    private levelText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "level1" });
    }

    preload() {
        this.load.image("background", "assets/img/background.png");
    }

    create() {
        this.add.image(350, 360, "background");
        this.add.rectangle(640, 0, 1280, 150, 0x0000);
        this.levelText = this.add.text(545, 10, "Level 1", {
            fontSize: "48px",
        });
        this.add.rectangle(1000, 250, 600, 350, 0xffff);
        this.add.rectangle(1000, 650, 600, 450, 0x9999);
    }

    update() {}
}
