import Phaser from "phaser";

export default class LevelZero extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private key?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "Level0" });
    }

    preload() {
        this.load.image("level0-background", "assets/level0-background.jpg");
        this.load.spritesheet("key", "assets/key.png", {
            frameWidth: 768 / 24,
            frameHeight: 32,
        });

        this.load.spritesheet("gal_right", "assets/Pink_Monster_Walk_6.png",
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("gal_left", "assets/Pink_Monster_Walk_Left6.png",
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("gal_idle_right", "assets/Pink_Monster_Idle_4.png",
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("gal_jump_right","assets/Pink_Monster_Jump_8.png",
            { frameWidth: 32, frameHeight: 32 });

        this.load.image("play", "assets/play-button.png");

        this.load.image("level0-platform", "assets/platform.png");
    }

    create() {
        const backgroundImage = this.add
            .image(0, 0, "level0-background")
            .setOrigin(0, 0);
        backgroundImage.setScale(
            this.cameras.main.width / backgroundImage.width,
            this.cameras.main.height / backgroundImage.height
        );

        this.key = this.physics.add.sprite(450, 450, "key").setScale(2.5, 2.5);
        this.key.setCollideWorldBounds(true);

        this.anims.create({
            key: "turn",
            frames: this.anims.generateFrameNumbers("key", {
                start: 0,
                end: 25,
            }),
            frameRate: 8,
            repeat: -1,
        });
        this.player = this.physics.add
            .sprite(100, 450, "gal_right")
            .setScale(3, 3);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("gal_right", {
                start: 0,
                end: 5,
            }),
            repeat: -1,
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: "gal_right", frame: 1 }],
        });
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("gal_left", {
                start: 0,
                end: 5,
            }),
            repeat: -1,
        });
        this.anims.create({
            key: "idle_right",
            frames: this.anims.generateFrameNumbers("gal_idle_right", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "jump_right",
            frames: this.anims.generateFrameNumbers("gal_jump_right", {
                start: 0,
                end: 7,
            }),
        });

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(350, 450, "level0-platform");
        this.platforms
            .create(1000, 300, "level0-platform")
            .setScale(1.25, 1.25);
        this.platforms.create(500, 150, "level0-platform").setScale(0.75, 0.75);
    }

    update() {
        if (this.key) {
            this.key.anims.play("turn", true);
        }
        if (this.player && this.cursors) {
            if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play("right", true);
            } else if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play("left", true);
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play("idle_right", true);
            }
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-330);
                this.player.anims.play("jump_right", true);
            }
        }
    }
}
