import Phaser from "phaser";
export default class endScene extends Phaser.Scene {
    private scoreText?: Phaser.GameObjects.Text;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: "endScene" });
    }

    create() {
        this.add.image(2048, 857, "levelBackg");
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.scoreText = this.add.text(2048, 857, "Game End!", {
            fontSize: "60px",
            color: "#000",
        });
        this.scoreText = this.add.text(2048, 1000, "Space bar to start over!", {
            fontSize: "32px",
            color: "#000",
        });
    }

    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.space.isDown) {
            this.scene.start("instructions");
        }
    }
}
