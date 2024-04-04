import Phaser from "phaser";

export default class LevelSelect extends Phaser.Scene {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private player?: Phaser.Physics.Arcade.Sprite;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private doors?: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "LevelSelect" });
    }
    create() {
        this.add
            .image(400, 300, "sky")
            .setDisplaySize(this.scale.width, this.scale.height);
        this.platforms = this.physics.add.staticGroup();

        // Add the following code to set the origin of the image to the top-left corner
        this.add
            .image(0, 0, "sky")
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height);
        const ground = this.platforms.create(
            630,
            568,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody().setTint(808080);

        this.player = this.physics.add.sprite(200, 200, "dude");
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(1);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard?.createCursorKeys();

        this.doors = this.physics.add.staticGroup();

        const closed_door = this.doors.create(
            800,
            491,
            "closed_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door.setScale(0.25).refreshBody();
        this.doors.setDepth(0);

        const open_door = this.doors.create(
            800,
            491,
            "open_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        open_door.setScale(0.25).refreshBody();
        open_door.setVisible(false);

        this.physics.add.overlap(
            this.player,
            this.doors,
            this.handleChangeScene,
            undefined,
            this
        );
    }

    private handleChangeScene() {
        this.scene.start("TerminalScene");
    }
    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-400);
            this.player?.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player?.setVelocityX(400);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn");
        }
        if (this.cursors.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocityY(-330);
        } else if (this.cursors.down.isDown) {
            this.player?.setVelocityY(330);
        }
    }
}
