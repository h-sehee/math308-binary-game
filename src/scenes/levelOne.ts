import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
//import FpsText from "../objects/fpsText";

export default class levelOne extends Phaser.Scene {
    //fpsText: FpsText;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.Group;
    private checkpoint: Phaser.Physics.Arcade.StaticGroup;

    private score = 0;
    private scoreText?: Phaser.GameObjects.Text;

    private baddie?: Phaser.Physics.Arcade.Group;

    private gameOver = false;

    constructor() {
        super({ key: "levelOne" });
    }

    create() {
        this.add.image(2048, 857, "levelBackg");
        //this.add.image(3072, 857, "levelBackg");
        this.platforms = this.physics.add.staticGroup();
        this.checkpoint = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            2048,
            1700,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        this.platforms.create(600, 800, "platform");
        this.platforms.create(50, 1200, "platform");
        this.platforms.create(1000, 400, "platform");
        this.platforms.create(3400, 900, "platform");
        this.platforms.create(2000, 1100, "platform");
        this.platforms.create(3000, 1200, "platform");

        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

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
        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 15,
            setXY: { x: 30, y: 0, stepX: 250 },
        });

        this.stars.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(
            this.player,
            this.stars,
            this.handleCollectStar,
            undefined,
            this
        );

        this.scoreText = this.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            color: "#000",
        });

        this.baddie = this.physics.add.group();

        this.physics.add.collider(this.baddie, this.platforms);
        this.physics.add.collider(
            this.player,
            this.baddie,
            this.handleHitBaddie,
            undefined,
            this
        );

        this.physics.add.collider(
            this.player,
            this.checkpoint,
            this.handleHitCheckpoint,
            undefined,
            this
        );
    }
    private handleHitCheckpoint() {
        this.scene.launch("LoadoutSceneTextboxInserts");
        this.scene.start("LoadoutSceneOne");
    }

    private handleHitBaddie() {
        this.physics.pause();
        this.player?.setTint(0xff0000);
        this.player?.anims.play("turn");

        this.gameOver = true;
    }

    private handleCollectStar(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ) {
        const star = s as Phaser.Physics.Arcade.Image;
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText?.setText(`Score: ${this.score}`);

        if (this.stars?.countActive(true) === 0) {
            this.stars.children.iterate((c) => {
                const child = c as Phaser.Physics.Arcade.Image;
                child.enableBody(true, child.x, 0, true, true);
                return true;
            });

            if (this.player) {
                const x =
                    this.player.x < 400
                        ? Phaser.Math.Between(400, 800)
                        : Phaser.Math.Between(0, 400);

                const baddie1: Phaser.Physics.Arcade.Image =
                    this.baddie?.create(x, 16, "baddie1");
                baddie1.setBounce(1);
                baddie1.setCollideWorldBounds(true);
                baddie1.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
            this.checkpoint.create(
                4000,
                1250,
                "checkpoint"
            ) as Phaser.Physics.Arcade.Sprite;
        }
    }

    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocityY(-550);
        }
    }
}
