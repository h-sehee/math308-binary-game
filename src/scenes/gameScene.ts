import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    private wizard: Phaser.Physics.Arcade.Sprite;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        //make background black
        this.add.image(600, 400, "background").setScale(2);

        //add floor
        this.platforms = this.physics.add.staticGroup();
        const level: Phaser.Physics.Arcade.Image = this.platforms
            .create(400, 400, "platform")
            .setScale(2, 1); //stretch floor

        this.add.text(165, 280, "Level A", {
            fontSize: "90px",
            color: "red",
        });
        this.wizard = this.physics.add.sprite(300, 450, "wizard");
        this.physics.world.setBounds(
            65, //div by 6?
            170, //div by 2 ish?
            level.displayWidth,
            level.displayHeight
        );

        this.wizard.setCollideWorldBounds(true);

        this.anims.create({
            key: "idle",
            frames: [{ key: "wizard", frame: 0 }],
            frameRate: 1,
            repeat: -1,
        });

        this.cursor = this.input.keyboard?.createCursorKeys();
    }

    update() {
        if (this.cursor?.left.isDown) {
            this.wizard.setVelocityX(-260);
        } else if (this.cursor?.right.isDown) {
            this.wizard.setVelocityX(260);
        } else if (this.cursor?.up.isDown) {
            this.wizard.setVelocityY(-260);
        } else if (this.cursor?.down.isDown) {
            this.wizard.setVelocityY(260);
        } else {
            this.wizard.setVelocity(0);
            this.wizard.anims.play("idle");
        }
    }
}
