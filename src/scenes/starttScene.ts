import Phaser from "phaser";
import FpsText from "../objects/fpsText";

export default class StartScene extends Phaser.Scene {
    fpsText: FpsText;

    constructor() {
        super({ key: "StartScene" });
    }

    create() {
        this.add.image(400, 300, "desktopBG");
        this.add.image(1100, 600, "CAT");
        // files
        // currently do nothing, should be spaced 100 pixels apart
        this.add.image(100, 100, "locked program");
        this.add.image(200, 100, "locked text");
        this.add.image(100, 200, "unlocked text");
    }

    update() {
        //this.fpsText.update();
    }
}
