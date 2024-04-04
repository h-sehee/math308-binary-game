import Phaser from "phaser";

export default class mainMenu extends Phaser.Scene {
    private button?: Phaser.GameObjects.Text;
    constructor() {
        super({ key: "mainMenu" });
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add
            .image(screenWidth, screenHeight, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        this.add.text(150, 150, "LEVEL 1");
        this.button = this.add
            .text(100, 100, "Click Here to Start", { color: "#0f000" })
            .setInteractive();
    }

    update() {}
}
