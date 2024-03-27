import Phaser from "phaser";

export default class titleScene extends Phaser.Scene {
    private start: Phaser.GameObjects.Rectangle;
    private collection: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: "titleScene" });
    }

    preload() {
        this.load.image("bg", "assets/img/title_screen.png");
    }

    create() {
        this.add.image(640, 360, "bg");

        this.start = this.add
            .rectangle(640, 550, 200, 100, 0x0000)
            .setInteractive();
        this.start.on("pointerdown", () => {
            this.scene.stop("titleScene").launch("level1");
        });
        this.add.text(568, 530, "Start", { color: "white", fontSize: "48px" });

        this.collection = this.add
            .rectangle(1000, 550, 400, 100, 0x0000)
            .setInteractive();
        this.collection.on("pointerdown", () => {
            console.log("collection");
        });
        this.add.text(830, 530, "Collectables", {
            color: "white",
            fontSize: "48px",
        });
    }

    update() {}
}
