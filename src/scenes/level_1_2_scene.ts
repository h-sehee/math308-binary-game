import Phaser from "phaser";
import { updateCurrentLevel } from "./currentLevel";
import LevelClass from "../Classes/LevelClass";
import { ButtonAndListensers } from "../components/buttonAndListeners";

export default class Level_1_2_scene extends LevelClass {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.Group;
    private spikes?: Phaser.Physics.Arcade.Group;
    private platforms2?: Phaser.Physics.Arcade.Group;
    private terminal?: Phaser.Physics.Arcade.Group;
    private score = 0;
    private scoreText?: Phaser.GameObjects.Text;
    private terminalArr: string[] = ["git_add_blue", "git_commit", "git_push"]; //this is the correct array that the terminal needs to emit
    private terminalCorrect: boolean = false;
    private terminalScene?: Phaser.Scene;
    private gameOver = false;
    private textSpawned = false;

    constructor() {
        super({ key: "Level_1_2_scene" });
    }

    private setTerminalCorrect(correct: boolean) {
        console.log("here");
        this.terminalCorrect = correct;
    }

    create() {
        const level_1_bg = this.add.image(640, 360, "level_1_bg");
        level_1_bg.setScale(1);

        this.add.text(400, 400, "git add blue -> commit -> push", {
            color: "#0f0",
        });
        this.add.text(
            400,
            425,
            "currently, the terminal is buggy and will only spawn a blue platform",
            {
                color: "#0f0",
            }
        );

        const npc_1 = this.add.image(1000, 620, "npc_1", 1);
        npc_1.setScale(2);

        //This is createing a solid object
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            640,
            720,
            "brown_plat_1"
        ) as Phaser.Physics.Arcade.Sprite;

        //setting the size of the groud (1, 2, 3)
        ground.setScale(40, 2).refreshBody();

        //platform 1
        this.platforms.create(200, 625, "brown_plat_1");

        this.player = this.physics.add.sprite(70, 600, "dude");
        this.player.setBounce(0.05);
        this.player.setCollideWorldBounds(true);
        this.player.body?.setSize(32, 32);
        this.player.setScale(2);

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
        this.spikes.create(400, 625, "spikes_hor");
        this.spikes.create(550, 625, "spikes_hor");
        this.spikes.create(700, 625, "spikes_hor");

        this.physics.add.collider(this.spikes, this.platforms);
        this.physics.add.collider(
            this.player,
            this.spikes,
            this.handleHitSpike,
            undefined,
            this
        );

        this.platforms2 = this.physics.add.group();

        this.physics.add.collider(this.platforms2, this.platforms);
        this.physics.add.collider(this.player, this.platforms2, undefined);

        this.terminal = this.physics.add.group();
        this.physics.add.collider(this.terminal, this.platforms);
        this.terminal.create(200, 500, "terminal");
        this.physics.add.collider(this.terminal, this.platforms);
        this.physics.add.overlap(
            this.player,
            this.terminal,
            () => {
                this.handleTerminal();
            },
            undefined,
            this
        );

        //Create terminal Buttons and Events
        this.events.on("terminal_input", () => {
            this.terminalCorrect = true;
        });
        this.events.once("terminalCollison", () => {
            new ButtonAndListensers(
                this,
                200,
                100,
                "button",
                [
                    "git add red",
                    "git add blue",
                    "git commit -m 'Add New Platform'",
                    "git push",
                ],
                [
                    "git add blue",
                    "git commit -m 'Add New Platform'",
                    "git push",
                ],
                this.handleCorrect
            );
        });
    }

    private handleTerminal() {
        this.events.emit("terminalCollison");
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

    private handlePlat() {
        let canSpawn = true;
        while (canSpawn) {
            this.platforms2?.create(500, 200, "blue_plat_1");
            this.terminalCorrect = false;
            canSpawn = false;
        }
    }

    private handleNPC() {
        let canSpawn = true;
        while (canSpawn) {
            this.add.text(
                800,
                500,
                "Hello! We have been waiting for you! \nPlease carry on to meet the rest of our crew!",
                {
                    color: "#FFF",
                    //fontSize: 20,
                }
            );
            this.textSpawned = true;
            canSpawn = false;
        }
    }
    private handleCorrect(scene: LevelClass, input: string[]): boolean {
        console.log(input);
        if (
            JSON.stringify(input) ===
            JSON.stringify([
                "Level_1_2_scene_git add blue",
                "Level_1_2_scene_git commit -m 'Add New Platform'",
                "Level_1_2_scene_git push",
            ])
        ) {
            scene.events.emit("terminal_input");
        }
        return true;
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
        if (this.terminalCorrect) {
            //this.platforms2?.create(500, 200, "blue_plat_1");
            this.handlePlat();
        }
        if (this.player) {
            if (this.player.x > 800 && !this.textSpawned) {
                this.handleNPC();
            }
            if (this.player.x > 1240) {
                this.scene.start("Level_1_3_scene");
                this.scene.stop("TerminalScene");
            }
        }
    }
}
