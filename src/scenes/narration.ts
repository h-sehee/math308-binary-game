import Phaser from "phaser";

export default class Narration extends Phaser.Scene {
    constructor() {
        super({ key: "narration" });
    }

    create() {
        const box = this.add
            .image(
                this.cameras.main.width / 2,
                this.cameras.main.height * (4 / 5),
                "message-box"
            )
            .setScale(0.9)
            .setOrigin(0.5)
            .setDepth(2005);

        this.add
            .text(
                box.x,
                box.y,
                "Hi! You need to roam around the map and open 6 chests\n" +
                    "to collect papers. After you collected all papers,\n" +
                    "you can reach the altar.\n" +
                    "\nWASD - move\t\t\t\t\t\t\t\t\t\t\tSpace - interact\t\t\t\t\t\t\t\t\t\t\tE - items",
                {
                    fontSize: "30px",
                    fontFamily: "cursive",
                    color: "0x000000",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(2010);

        const close = this.add
            .text(
                box.x + box.width / 2 - 65,
                box.y - box.height / 2 + 15,
                "X",
                {
                    fontSize: "50px",
                    fontFamily: "cursive",
                    strokeThickness: 6,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(2010);

        close.setInteractive();
        close.on("pointerover", () => {
            close.setFontSize("55px");
            this.input.setDefaultCursor("pointer");
        });
        close.on("pointerout", () => {
            close.setFontSize("50px");
            this.input.setDefaultCursor("default");
        });
        close.on("pointerdown", () => {
            this.input.setDefaultCursor("default");
            this.scene.stop();
        });
    }
}
