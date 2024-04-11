import Phaser from "phaser";

export default class MazeMap extends Phaser.Scene {
    private usedThreads: number;

    constructor() {
        super({ key: "maze-map" });
    }

    init(data: { threads: number }) {
        this.usedThreads = 5 - data.threads;
    }

    create() {
        //console.log("MazeMap created");
        this.add
            .rectangle(
                15,
                this.cameras.main.height - 15,
                this.cameras.main.width * 0.25,
                this.cameras.main.height * 0.25,
                0xffffff,
                0.5
            )
            .setOrigin(0, 1)
            .setDepth(999);

        this.add
            .text(
                this.cameras.main.width - 20,
                this.cameras.main.height - 20,
                "X",
                {
                    fontSize: "35px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 6,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
    }
}
