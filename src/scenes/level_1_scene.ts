import Phaser from "phaser";
import { updateCurrentLevel } from "./currentLevel";

export default class Level_1_scene extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.Group;
    private spikes?: Phaser.Physics.Arcade.Group;
    private terminal?: Phaser.Physics.Arcade.Group;
    private score = 0;
    private scoreText?: Phaser.GameObjects.Text;

    private gameOver = false;

    constructor() {
        super({ key: "Level_1_scene" });
    }

    create() {
        const bg_1 = this.add.image(640, 360, "space_bg");
        bg_1.setScale(1.35);

        //This is createing a solid object
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            640,
            720,
            "plat_1"
        ) as Phaser.Physics.Arcade.Sprite;

        //setting the size of the groud (1, 2, 3)
        ground.setScale(40, 2).refreshBody();

        //platform 1
        this.platforms.create(200, 600, "plat_1");
        this.platforms.create(232, 600, "plat_1");
        this.platforms.create(264, 600, "plat_1");

        //platform 2
        this.platforms.create(400, 600, "plat_1");
        this.platforms.create(432, 600, "plat_1");
        this.platforms.create(464, 600, "plat_1");

        //platform 3
        this.platforms.create(600, 600, "plat_1");
        this.platforms.create(632, 600, "plat_1");
        this.platforms.create(664, 600, "plat_1");

        //platform 4
        this.platforms.create(800, 600, "plat_1");
        this.platforms.create(832, 600, "plat_1");
        this.platforms.create(864, 600, "plat_1");

        //platform 5
        this.platforms.create(1100, 550, "plat_1");
        this.platforms.create(1132, 550, "plat_1");
        this.platforms.create(1164, 550, "plat_1");
        this.platforms.create(1192, 550, "plat_1");
        this.platforms.create(1224, 550, "plat_1");
        this.platforms.create(1256, 550, "plat_1");

        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.05);
        this.player.setCollideWorldBounds(true);
        this.player.body?.setSize(32, 32);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("cat", {
                start: 3,
                end: 5,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: "cat", frame: 1 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("cat", {
                start: 6,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard?.createCursorKeys();

        this.stars = this.physics.add.group();
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(
            this.player,
            this.stars,
            this.handleCollectStar,
            undefined,
            this
        );
        this.stars.create(1100, 680, "star");
        this.stars.create(1150, 680, "star");
        this.stars.create(1200, 680, "star");

        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            color: "#000",
        });

        this.spikes = this.physics.add.group();
        this.spikes.create(200, 700, "spikes");
        this.spikes.create(248, 700, "spikes");
        this.spikes.create(296, 700, "spikes");
        this.spikes.create(344, 700, "spikes");
        this.spikes.create(392, 700, "spikes");
        this.spikes.create(440, 700, "spikes");
        this.spikes.create(488, 700, "spikes");
        this.spikes.create(536, 700, "spikes");
        this.spikes.create(584, 700, "spikes");
        this.spikes.create(632, 700, "spikes");
        this.spikes.create(680, 700, "spikes");
        this.spikes.create(728, 700, "spikes");
        this.spikes.create(776, 700, "spikes");
        this.spikes.create(824, 700, "spikes");
        this.spikes.create(872, 700, "spikes");
        this.spikes.create(920, 700, "spikes");
        this.spikes.create(968, 700, "spikes");
        //this.spikes.create(1016, 700, "spikes");

        this.physics.add.collider(this.spikes, this.platforms);
        this.physics.add.collider(
            this.player,
            this.spikes,
            this.handleHitSpike,
            undefined,
            this
        );
        this.terminal = this.physics.add.group();
        this.physics.add.collider(this.terminal, this.platforms);
        this.terminal.create(1200, 500, "terminal");
        this.physics.add.collider(this.terminal, this.platforms);
        this.physics.add.overlap(
            this.player,
            this.terminal,
            this.handleTerminal,
            undefined,
            this
        );
    }

    private handleTerminal() {
        this.scene.launch("TerminalScene");
        let terminalScene = this.scene.get("TerminalScene");
        terminalScene.events.on("git_add_red_clicked", function () {
            console.log("Red clicked in Level 1");
        });
        terminalScene.events.on("git_add_blue_clicked", function () {
            console.log("Blue clicked in Level 1");
        });
        terminalScene.events.on("git_commit_clicked", function () {
            console.log("Commit clicked in Level 1");
        });
        terminalScene.events.on("git_push_clicked", function () {
            console.log("Push clicked in Level 1");
        });
    }

    private handleHitSpike() {
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
        this.scoreText?.setText(`score: ${this.score}`);
    }

    update() {
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-200);
            this.player?.anims.play("left", true);
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(200);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn", true);
        }

        if (this.cursors?.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocityY(-300);
        }
        if (this.gameOver) {
            this.gameOver = false;
            updateCurrentLevel(this.scene.key);
            this.scene.stop("TerminalScene");
            this.scene.start("RespawnScene");
            this.scene.stop();
        }
    }
}
