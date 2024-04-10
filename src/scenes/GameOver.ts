import Phaser from "phaser";
import FpsText from "../objects/fpsText";

export default class GameOver extends Phaser.Scene {
    fpsText: FpsText;

    constructor() {
        super({ key: "GameOver" });
    }

    create() {
        this.scene.stop("game-ui");

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
                "Game Over",
                {
                    fontSize: "35px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 6,
                    stroke: "0xffffff",
                    shadow: {
                        color: "#FF0000",
                        fill: true,
                        offsetX: 3,
                        offsetY: 3,
                        blur: 4,
                        stroke: false,
                    },
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        const retry = this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 1.5,
                "Retry",
                {
                    fontSize: "25px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 4,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        retry.setInteractive();
        retry.on("pointerdown", () => {
            this.scene.start("tutorial");
            this.events.emit("gameRetry");
        });

        this.tweens.add({
            targets: retry,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });

        this.add.image(0, 0, "base_tiles");
        const map = this.make.tilemap({ key: "tilemap" });
        const tileset = map.addTilesetImage(
            "dungeon",
            "base_tiles",
            16,
            16
        ) as Phaser.Tilemaps.Tileset;

        map.createLayer("ground", tileset);
        map.createLayer("wall", tileset) as Phaser.Tilemaps.TilemapLayer;
        map.createLayer("door", tileset) as Phaser.Tilemaps.TilemapLayer;
    }

    update() {
        this.fpsText.update();
    }
}
