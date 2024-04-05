import Phaser from "phaser";
export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class Game_1 extends Phaser.Scene {
    constructor() {
        super({ key: "Game_1" });
    }

    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private tomato?: Phaser.Physics.Arcade.Group;

    private score = 0;
    private scoreText?: Phaser.GameObjects.Text;

    create() {
        this.add.image(400, 300, "tomato");
        //temporary image
        this.add.image(640, 280, "kitchen1");

        this.tomato = this.physics.add.group({
            key: "tomato",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.tomato.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });


        //Creates player input and player object.
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.player = this.physics.add.sprite(
            this.cameras.main.displayWidth / 2,
            this.cameras.main.displayHeight / 2,
            "dude"
        );
        this.player.setCollideWorldBounds(true);

        //Animations for player.
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 131,
                end: 132,
            }),
            frameRate: 2,
            repeat: -1,
        });
        this.anims.create({
            key: "l_walk",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 118,
                end: 125,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "r_walk",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 144,
                end: 151,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "u_walk",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 105,
                end: 112,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "d_walk",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 131,
                end: 138,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    update() {
        //Horizontal Movement
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-300);
            this.player?.anims.play("l_walk", true);
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(300);
            this.player?.anims.play("r_walk", true);
        } else {
            this.player?.setVelocityX(0);
        }
        //Vertical Movement
        if (this.cursors?.up.isDown) {
            this.player?.setVelocityY(-300);
            this.player?.anims.play("u_walk", true);
        } else if (this.cursors?.down.isDown) {
            this.player?.setVelocityY(300);
            this.player?.anims.play("d_walk", true);
        } else {
            this.player?.setVelocityY(0);
        }
        //Check if idle
        if (
            this.cursors?.left.isUp &&
            this.cursors.right.isUp &&
            this.cursors.up.isUp &&
            this.cursors.down.isUp
        ) {
            this.player?.anims.play("idle", true);
        }
    }
}
