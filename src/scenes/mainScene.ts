import Phaser from "phaser";


export default class MainScene extends Phaser.Scene {
   
    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.scene.start("TerminalScene");
    }

    update() {
    }
}
