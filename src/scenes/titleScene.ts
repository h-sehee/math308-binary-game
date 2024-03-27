import Phaser from "phaser";

export default class titleScene extends Phaser.Scene {
    private start: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: "titleScene" });
    }

    preload() {
        this.load.image("bg", "assets/img/title_screen.png");
    }

    create() {
        this.add.image(640, 360, "bg");
        this.start = this.add.rectangle(640, 550, 250, 100, 0x0000).setInteractive().on("pointerdown", () => {this.goToLevel1()});
        this.add.text(568, 530, "START", {color: "white", fontSize: "48px"})
    }

    private goToLevel1() {
        console.log("Level 1");
    }

    update() {}
}
