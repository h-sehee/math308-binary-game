import Phaser from "phaser";
export default class instructions extends Phaser.Scene {
    private scoreText?: Phaser.GameObjects.Text;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: "instructions" });
    }

    create() {
        this.add.image(2048, 857, "levelBackg");
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.scoreText = this.add.text(1300, 500, "Western Weaponsmith!", {
            fontSize: "125px",
            color: "#000",
        });
        this.scoreText = this.add.text(
            550,
            800,
            "1. Click on words under “Menu” to see what classes, types, and attributes you have unlocked",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            900,
            "2. Click on each red box and begin typing to replace the text in the box with the correct class, attribute, and type names. ",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            1000,
            "3. Click “Submit Code” and rectify any errors that you see in the errors box.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            1100,
            "4. Navigate your player with up down left right arrow keys and press space bar to fire weapon.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(
            550,
            1150,
            "   Defeat all enemies and jump into the win flag.",
            {
                fontSize: "45px",
                color: "#000",
            }
        );
        this.scoreText = this.add.text(550, 1500, "Space bar to start!", {
            fontSize: "45px",
            color: "#000",
        });
    }
    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.space.isDown) {
            this.scene.launch("LoadoutSceneTextboxInserts");
            this.scene.start("LoadoutSceneOne");
        }
    }
}
