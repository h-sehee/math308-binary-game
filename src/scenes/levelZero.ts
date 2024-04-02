import Phaser from "phaser";

export default class LevelZero extends Phaser.Scene {
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
    }
}
