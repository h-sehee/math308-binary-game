import Phaser from "phaser";

export default class titleScene extends Phaser.Scene {
    private start: Phaser.GameObjects.Rectangle;
    private collection: Phaser.GameObjects.Rectangle;
    private mute: Phaser.GameObjects.Image;
    private unmute: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "titleScene" });
    }

    preload() {
        this.load.image("bg", "assets/img/title_screen.png");
        this.load.image("mute", "assets/img/mute.png");
        this.load.image("unmute", "assets/img/unmute.png");
    }

    create() {
        this.add.image(640, 360, "bg");

        //start button
        this.start = this.add
            .rectangle(640, 550, 200, 100, 0x0000)
            .setInteractive();
        this.start.on("pointerup", () => {
            this.scene.stop("titleScene").launch("level1");
        });
        this.add.text(568, 530, "Start", { color: "white", fontSize: "48px" });

        //collectables
        this.collection = this.add
            .rectangle(1000, 550, 400, 100, 0x0000)
            .setInteractive();
        this.collection.on("pointerup", () => {
            console.log("collection");
        });
        this.add.text(830, 530, "Collectables", {
            color: "white",
            fontSize: "48px",
        });

        //mute button
        this.unmute = this.add.image(50, 50, "unmute").setInteractive().setVisible(false);
        this.unmute.setAlpha(.7);
        this.unmute.on("pointerover", () => {
            this.unmute.setAlpha(1);
        });
        this.unmute.on("pointerout", () => {
            this.unmute.setAlpha(.7);
        });
        this.unmute.on("pointerup", () => {
            this.unmute.setVisible(false);
            this.mute.setVisible(true);
        });

        this.mute = this.add.image(50, 50, "mute").setInteractive();
        this.mute.setAlpha(.7);
        this.mute.on("pointerover", () => {
            this.mute.setAlpha(1);
        });
        this.mute.on("pointerout", () => {
            this.mute.setAlpha(.7);
        });
        this.mute.on("pointerup", () => {
            this.mute.setVisible(false);
            this.unmute.setVisible(true);
        })
    }

    update() {}
}
