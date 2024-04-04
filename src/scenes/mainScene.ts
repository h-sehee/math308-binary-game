import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
import FpsText from "../objects/fpsText";

export default class MainScene extends Phaser.Scene {
    fpsText: FpsText;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.add.image(700, 400, "grass");
        this.add.image(1100, 400, "grass");
        let train = this.add.image(5, 300, "trainGrounds");
        train.flipX = true;
        const graphics = this.add.graphics();

        // Set the line color and alpha (opacity)
        graphics.lineStyle(2, 0x000000, 1); // Black color with opacity 1 (fully opaque)

        // Draw a rectangle shape without fill
        const rectangle = new Phaser.Geom.Rectangle(100, 200, 500, 500);
        graphics.strokeRectShape(rectangle);

        // Enable input events on the rectangle
        graphics.setInteractive(rectangle, Phaser.Geom.Rectangle.Contains);

        //new PhaserLogo(this, this.cameras.main.width / 2, 0);
        this.fpsText = new FpsText(this);

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
