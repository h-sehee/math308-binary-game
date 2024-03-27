import Phaser from "phaser";

export default class level1 extends Phaser.Scene {
    private levelText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "level1" });
    }

    preload() {
        this.load.image("bg", "assets/img/title_screen.png");
    }

    create() {
        this.add.image(640, 360, "bg");
        this.levelText = this.add.text(10, 640, "Level 1", {
            fontSize: "48px",
        });
    }

    update() {}
}
