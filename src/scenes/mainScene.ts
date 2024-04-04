import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
import FpsText from "../objects/fpsText";
//background image by rawpixel.com
export default class MainScene extends Phaser.Scene {
    fpsText: FpsText;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.fpsText = new FpsText(this);
        const background = this.add.image(400, 300, "background");
        background.setDepth(0);

        this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 3,
                "Infamia di Creti",
                {
                    fontSize: "60px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 4,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5);

        const startGame = this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 1.75,
                "Enter the Maze",
                {
                    fontSize: "40px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 4,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5);

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
                fontSize: "24px",
            })
            .setOrigin(1, 0);
    }

    update() {
        this.fpsText.update();
    }
}
