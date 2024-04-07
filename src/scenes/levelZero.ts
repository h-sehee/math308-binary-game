import Phaser from "phaser";

export default class LevelZero extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private key?: Phaser.Physics.Arcade.Sprite;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private spikes?: Phaser.Physics.Arcade.StaticGroup;
    private ladder?: Phaser.Physics.Arcade.Sprite;
    private plank?: Phaser.Physics.Arcade.Sprite;
    private door?: Phaser.Physics.Arcade.Image;

    private stackpack: Phaser.Physics.Arcade.Sprite[] = [];
    private collectedItems: Phaser.Physics.Arcade.Sprite[] = []; // To track all collected items (even after they're popped from stackpack)
    private stackpackText?: Phaser.GameObjects.Text;
    private keyE?: Phaser.Input.Keyboard.Key;
    //private keyF?: Phaser.Input.Keyboard.Key;
    private keyEPressed: boolean = false; // Flag to check if 'E' was pressed to prevent picking up multiple items from one long key press

    constructor() {
        super({ key: "Level0" });
    }

    preload() {
        this.load.image("level0-background", "assets/level0-background.jpg");

        this.load.spritesheet("key", "assets/key.png", {
            frameWidth: 768 / 24,
            frameHeight: 32,
        });

        this.load.spritesheet("gal_right", "assets/Pink_Monster_Walk_6.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet(
            "gal_left",
            "assets/Pink_Monster_Walk_Left6.png",
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet(
            "gal_idle_right",
            "assets/Pink_Monster_Idle_4.png",
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet(
            "gal_jump_right",
            "assets/Pink_Monster_Jump_8.png",
            { frameWidth: 32, frameHeight: 32 }
        );

        this.load.image("play", "assets/play-button.png");
        this.load.image("level0-platform", "assets/platform.png");
        this.load.image(
            "spike",
            "assets/spikes2/keyframes/long_metal_spike.png"
        );
        this.load.image("ladder", "assets/ladder.png");
        this.load.image("plank", "assets/plank.png");
        this.load.image("door", "assets/door.png");
    }

    create() {
        const backgroundImage = this.add
            .image(0, 0, "level0-background")
            .setOrigin(0, 0);
        backgroundImage.setScale(
            this.cameras.main.width / backgroundImage.width,
            this.cameras.main.height / backgroundImage.height
        );

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

        // Create platforms
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            650,
            790,
            "level0-platform"
        ) as Phaser.Physics.Arcade.Image;

        ground.setScale(5).refreshBody();
        ground.setAlpha(0); // Hide the ground platform

        this.platforms.create(350, 585, "level0-platform").setScale(1, 1);
        this.platforms.create(650, 500, "level0-platform").setScale(0.75, 0.75);
        this.platforms.create(850, 300, "level0-platform").setScale(1, 0.75);

        this.physics.add.collider(this.player, this.platforms);

        // Create objects: key, ladder, plank, spikes, door
        this.key = this.physics.add.sprite(1225, 450, "key").setScale(2.5, 2.5);
        this.key.setCollideWorldBounds(true);
        this.physics.add.collider(this.key, this.platforms);

        this.ladder = this.physics.add
            .sprite(1100, 50, "ladder")
            .setScale(0.5, 0.5);
        this.ladder.setCollideWorldBounds(true);
        this.physics.add.collider(this.ladder, this.platforms);

        this.plank = this.physics.add
            .sprite(350, 200, "plank")
            .setScale(0.5, 0.5);
        this.plank.setCollideWorldBounds(true);
        this.physics.add.collider(this.plank, this.platforms);

        this.spikes = this.physics.add.staticGroup();
        this.spikes.create(850, 675, "spike").setScale(0.75, 0.75);
        this.spikes.create(900, 675, "spike").setScale(0.75, 0.75);
        this.spikes.create(950, 675, "spike").setScale(0.75, 0.75);
        this.spikes.create(1000, 675, "spike").setScale(0.75, 0.75);
        this.physics.add.collider(this.spikes, this.platforms);

        this.door = this.physics.add.image(865, 150, "door").setScale(0.1, 0.1);
        this.physics.add.collider(this.door, this.platforms);

        // Define keys 'e' and 'f' for collecting and using items respectively
        this.keyE = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.E
        );
        /*const keyF = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.F
        );*/

        this.stackpackText = this.add.text(16, 16, "Stackpack:", {
            fontSize: "24px",
            color: "#000000",
        });
    }

    private updateStackpackText() {
        if (this.stackpackText && this.stackpack.length > 0) {
            let text = "Stackpack:\n";
            this.stackpack.forEach((item, index) => {
                text += `Item ${index + 1}: ${item.texture.key}\n`;
            });
            this.stackpackText.setText(text);
        }
    }

    private collectItem(item: Phaser.Physics.Arcade.Sprite) {
        if (this.collectedItems.includes(item)) {
            return;
        }

        // Add the item to the player's stackpack
        this.stackpack.push(item);

        // Add the item to the grand list of collected items
        this.collectedItems.push(item);

        // Disable the item (remove it from the scene and hide it)
        item.disableBody(true, true);

        this.updateStackpackText();
    }

    update() {
        // Key animation
        if (this.key) {
            this.key.anims.play("turn", true);
        }

        // Move the gal with arrow keys
        if (this.player && this.cursors) {
            if (this.cursors.right.isDown) {
                this.player.setVelocityX(290);
                this.player.anims.play("right", true);
            } else if (this.cursors.left.isDown) {
                this.player.setVelocityX(-290);
                this.player.anims.play("left", true);
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play("idle_right", true);
            }
            if (this.cursors.up.isDown && this.player.body?.touching.down) {
                console.log("here");
                this.player.setVelocityY(-530);
                this.player.anims.play("jump_right", true);
            }
        }

        // Check if 'E' key is pressed
        if (this.player && this.keyE?.isDown && !this.keyEPressed) {
            this.keyEPressed = true; // Set the flag for the E key being pressed to true

            // Check if the player is close enough to the key, ladder, or plank, and if so, collect it
            if (
                this.key &&
                Phaser.Math.Distance.Between(
                    this.player.x,
                    this.player.y,
                    this.key.x,
                    this.key.y
                ) < 100
            ) {
                this.collectItem(this.key);
            }
            if (
                this.ladder &&
                Phaser.Math.Distance.Between(
                    this.player.x,
                    this.player.y,
                    this.ladder.x,
                    this.ladder.y
                ) < 100
            ) {
                this.collectItem(this.ladder);
            }
            if (
                this.plank &&
                Phaser.Math.Distance.Between(
                    this.player.x,
                    this.player.y,
                    this.plank.x,
                    this.plank.y
                ) < 100
            ) {
                this.collectItem(this.plank);
            }
        }
        // Check if 'E' key is released
        if (this.keyE?.isUp) {
            this.keyEPressed = false; // Reset the keyEPressed flag when the E key is released
        }
    }
}
