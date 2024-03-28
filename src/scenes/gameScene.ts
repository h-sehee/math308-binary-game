import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    private wizard: Phaser.Physics.Arcade.Sprite;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    //private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        //make background gray
        this.add.image(600, 400, "background").setScale(2);

        //add level
        this.platforms = this.physics.add.staticGroup();
        const level: Phaser.Physics.Arcade.Image = this.platforms
            .create(400, 400, "platform")
            .setScale(2, 1);

        this.add.text(165, 280, "Level A", {
            fontSize: "90px",
            color: "red",
        });
        this.wizard = this.physics.add.sprite(200, 450, "wizard");
        this.physics.world.setBounds(190, 170, level.width, level.height);

        this.wizard.setCollideWorldBounds(true);

        /*         this.physics.world.enable(level);
        this.physics.add.collider(this.wizard, level); */

        this.anims.create({
            key: "idle",
            frames: [{ key: "wizard", frame: 0 }],
            frameRate: 1,
            repeat: -1,
        });
    }

    update() {
        this.wizard.setVelocityY(370);
        this.wizard.anims.play("idle");
    }
}
