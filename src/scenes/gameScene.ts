import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    private wizard: Phaser.Physics.Arcade.Sprite;
    //private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        this.add.text(165, 280, "Level A", {
            fontSize: "90px",
            color: "red",
        });
        this.wizard = this.physics.add.sprite(200, 450, "wizard");
        //this.wizard.setScale(5);
        this.wizard.setCollideWorldBounds(true);
        //this.wizard.setPipeline("GreenScreenPipeline");

        this.anims.create({
            key: "idle",
            frames: [{ key: "wizard", frame: 0 }],
            frameRate: 1,
            repeat: -1,
        });
    }

    update() {
        this.wizard.setVelocity(0);
        this.wizard.anims.play("idle");
    }
}
