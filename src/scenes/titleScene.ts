import Phaser from "phaser";

export default class titleScene extends Phaser.Scene {

    constructor() {
        super({ key: "titleScene" });
    }

    preload() {
        this.load.image("bg", "assets/img/title_screen.png");
    }

    create() {
        this.add.image(640, 360, "bg");
    }

    update() {}
}
