import Phaser from "phaser";

export default class LevelZero extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private key?: Phaser.GameObjects.Sprite;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private spikes?: Phaser.Physics.Arcade.StaticGroup;
    private ladder?: Phaser.GameObjects.Sprite;
    private plank?: Phaser.GameObjects.Sprite;
    private door?: Phaser.Physics.Arcade.Image;

    private stack: Phaser.GameObjects.Sprite[] = [];
    private collectedItems: Phaser.GameObjects.Sprite[] = []; // To track all collected items (even after they're popped from stack)
    //private stackText?: Phaser.GameObjects.Text;
    private keyE?: Phaser.Input.Keyboard.Key;
    private keyF?: Phaser.Input.Keyboard.Key;
    private keyEPressed: boolean = false; // Flag to check if 'E' was pressed to prevent picking up multiple items from one long key press
    private keyFPressed: boolean = false; // Flag to check if 'E' was pressed to prevent using multiple items from one long key press
    private lastDirection: string = "right";

    constructor() {
        super({ key: "Level0" });
    }

    preload() {
        this.load.image("level0-background", "assets/level0-background.jpg");
        this.load.image("stackpack", "assets/stackpack.png");

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
            "gal_idle_left",
            "assets/Pink_Monster_Idle_Left4.png",
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

        const stackpack = this.add
            .image(0, 0, "stackpack")
            .setPosition(1170, 165);
        stackpack.setScale(0.26, 0.26);

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
            key: "idle_left",
            frames: this.anims.generateFrameNumbers("gal_idle_left", {
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
        this.key = this.add.sprite(1200, 650, "key").setScale(2.5, 2.5);
        this.physics.add.collider(this.key, this.platforms);

        this.ladder = this.add.sprite(1050, 550, "ladder").setScale(0.5, 0.5);

        this.plank = this.add.sprite(350, 530, "plank").setScale(0.5, 0.5);

        this.spikes = this.physics.add.staticGroup();
        this.spikes.create(780, 675, "spike").setScale(0.75, 0.75);
        this.spikes.create(830, 675, "spike").setScale(0.75, 0.75);
        this.spikes.create(880, 675, "spike").setScale(0.75, 0.75);
        this.spikes.create(930, 675, "spike").setScale(0.75, 0.75);

        this.door = this.physics.add.image(865, 150, "door").setScale(0.1, 0.1);
        this.physics.add.collider(this.door, this.platforms);

        // Set the depth of the character/player sprite to a high value
        this.player.setDepth(1);

        // Set the depth of other game objects to lower values
        this.key.setDepth(0);
        this.ladder.setDepth(0);
        this.plank.setDepth(0);
        this.spikes.setDepth(0);
        this.door.setDepth(0);

        // Define keys 'E' and 'F' for collecting and using items respectively
        this.keyE = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.E
        );
        this.keyF = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.F
        );

        /*this.stackText = this.add.text(16, 16, "Stackpack:", {
            fontSize: "24px",
            color: "#000000",
        });*/
    }

    /*private updateStackText() {
        if (this.stackText && this.stack.length > 0) {
            let text = "Stackpack:\n";
            this.stack.forEach((item, index) => {
                text += `Item ${index + 1}: ${item.texture.key}\n`;
            });
            this.stackText.setText(text);
        }
    }*/

    private updateStackView() {
        const offsetX = 1170; // starting X position for stack items
        const offsetY = 270; // starting Y position for stack items
        const padding = 20;

        let currTotalHeight = 0;

        this.stack.forEach((item) => {
            // Calculate and set (x, y) position of stack items in stackpack view
            item.setOrigin(0.5, 0);
            const stackItemX = offsetX;
            const stackItemY =
                offsetY - item.displayHeight - currTotalHeight - padding;
            currTotalHeight += item.displayHeight + padding;
            item.setPosition(stackItemX, stackItemY);
        });
    }

    private collectItem(item: Phaser.GameObjects.Sprite) {
        if (this.collectedItems.includes(item)) {
            return;
        }

        // Scale down the collected item to prepare it for stackpack view
        const currScale = item.scaleX;
        item.setScale(currScale * 0.5);

        // Add the item to the player's stackpack
        this.stack.push(item);

        // Add the item to the grand list of collected items
        this.collectedItems.push(item);

        //this.updateStackText();
        this.updateStackView();
    }

    private useItem() {
        // Remove the top item from the stackpack
        const poppedItem = this.stack.pop();

        // Enable the item (make it visible and active in the scene)
        if (poppedItem) {
            // Set scale back to normal
            const currScale = poppedItem.scaleX;
            poppedItem.setScale(currScale * 2);

            // Set item origin back to default (center)
            poppedItem.setOrigin(0.5, 0.5);

            // Move popped item to location it will be used
            poppedItem.setPosition(400, 200);
        }

        //this.updateStackText();
        this.updateStackView();
    }

    update() {
        // Key animation
        if (this.key) {
            this.key.anims.play("turn", true);
        }

        // Move the gal with arrow keys
        // Inside your update function or wherever you handle player movement
        if (this.player && this.cursors) {
            if (this.cursors.right.isDown) {
                this.player.setVelocityX(290);
                this.player.anims.play("right", true);
                this.lastDirection = "right"; // Update last direction
            } else if (this.cursors.left.isDown) {
                this.player.setVelocityX(-290);
                this.player.anims.play("left", true);
                this.lastDirection = "left"; // Update last direction
            } else {
                this.player.setVelocityX(0);
                // Check last direction and play corresponding idle animation
                if (this.lastDirection === "right") {
                    this.player.anims.play("idle_right", true);
                } else {
                    this.player.anims.play("idle_left", true);
                }
            }
            if (this.cursors.up.isDown && this.player.body?.touching.down) {
                console.log("here");
                this.player.anims.play("jump_right", true);
                this.player.setVelocityY(-530);
            }
        }

        // Collect item if 'E' key is pressed
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

        // Use item if 'F' key is pressed
        if (this.keyF?.isDown && !this.keyFPressed && this.stack.length > 0) {
            this.keyFPressed = true; // Set the flag for the F key being pressed to true
            this.useItem();
        }
        // Check if 'F' key is released
        if (this.keyF?.isUp) {
            this.keyFPressed = false; // Reset the keyFPressed flag when the F key is released
        }
    }
}
