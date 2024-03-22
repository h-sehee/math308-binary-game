import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {

    private titleText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "StartScene" });
    }

    create() {
        this.add.image(640, 360, "startBackground");

        this.titleText = this.add.text(165, 280, '$>Bash the Dungeon', {
            fontSize: "85px",
            color: "#fff",
        })

        const startBtn = this.add.image(640, 450, "startBtn");
        startBtn.setScale(0.5);
    }

    update() {
    }
}
