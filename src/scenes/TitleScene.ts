import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
import FpsText from "../objects/fpsText";
//import PreloadScene from "./preloadScene";
//background image by rawpixel.com
//audio for title scene by Darren Curtis
export default class TitleScene extends Phaser.Scene {
    fpsText: FpsText;

    constructor() {
        super({ key: "TitleScene" });
    }

    create() {
        this.fpsText = new FpsText(this);
        const background = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "background"
        );
        let X = this.cameras.main.width / background.width;
        let Y = this.cameras.main.height / background.height;
        let scale = Math.max(X, Y);
        background.setScale(scale).setScrollFactor(0);
        background.setDepth(0);

        this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 3,
                "Infamia di Creti",
                {
                    fontSize: "35px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 6,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5);

        const startGame = this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 1.5,
                "Enter the Maze",
                {
                    fontSize: "25px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 4,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5);
        startGame.setInteractive();
        startGame.on("pointerdown", () => this.scene.start("mainScene"));

        this.tweens.add({
            targets: startGame,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });

        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "5px",
            })
            .setOrigin(1, 0);
    }

    update() {
        this.fpsText.update();
    }
}
