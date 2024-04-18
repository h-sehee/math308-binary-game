import Phaser from "phaser";

export default class LevelSelect extends Phaser.Scene {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private player?: Phaser.Physics.Arcade.Sprite;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private doors?: Phaser.Physics.Arcade.StaticGroup;
    private lvl1?: boolean = true;
    private lvl2?: boolean = false;
    private lvl3?: boolean = false;
    private lvl4?: boolean = false;
    private lvl5?: boolean = false;
    private username: string;
    private lastDirection: string;

    constructor() {
        super({ key: "LevelSelect" });
    }

    init(data: {
        username: string;
        lvl1: boolean;
        lvl2: boolean;
        lvl3: boolean;
        lvl4: boolean;
        lvl5: boolean;
    }) {
        this.username = data.username;

        if (this.username === "admin") {
            this.lvl2 = true;
            this.lvl3 = true;
            this.lvl4 = true;
            this.lvl5 = true;
        } else {
            this.lvl2 = data.lvl2;
            this.lvl3 = data.lvl3;
            this.lvl4 = data.lvl4;
            this.lvl5 = data.lvl5;
        }
        this.lvl1 = true;
    }

    create() {
        this.platforms = this.physics.add.staticGroup();
        this.cameras.main.setBackgroundColor("#A9A9A9");

        const groundWidth = this.scale.width;
        const groundX = this.scale.width / 2;
        const groundX2 = groundWidth + groundWidth / 2;

        const ground = this.platforms.create(
            groundX,
            568,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;

        ground
            .setScale(groundWidth / ground.width, 1)
            .refreshBody()
            .setTint(808080);
        const ground2 = this.platforms.create(groundX2, 568, "ground");
        ground2
            .setScale(groundWidth / ground.width, 1)
            .refreshBody()
            .setTint(808080);

        this.add.image(1175, 330, "arrow").setScale(0.5);

        const walls = [{ x: -357 }, { x: 2555 }];

        walls.forEach((pos) => {
            this.platforms
                ?.create(pos.x, 0, "ground")
                .setOrigin(0, 0)
                .setScale(1, this.scale.height)
                .refreshBody()
                .setTint(808080);
        });

        // Title Text

        const title = this.add.text(475, 100, "Level Select", {
            fontFamily: "Arial",
            fontSize: 60,
            color: "#000000",
        });
        title.setStroke("#FFFF00", 6);
        const levelTextPositions = [
            { x: 490, level: "1" },
            { x: 940, level: "2" },
            { x: 1390, level: "3" },
            { x: 1840, level: "4" },
            { x: 2290, level: "5" },
        ];
        levelTextPositions.forEach((pos) => {
            const text = this.add.text(pos.x, 430, pos.level, {
                fontFamily: "Arial",
                fontSize: 24,
                color: "#000000",
            });
            text.setStroke("#FFFF00", 6);
        });

        // this.player = this.physics.add.sprite(250, 370, "spy");
        this.player = this.physics.add.sprite(250, 370, "dude").setScale(0.2);
        this.player.setCollideWorldBounds(false);
        this.player.setDepth(1);
        this.cameras.main.setBounds(0, 0, 2595, this.scale.height);

        this.cameras.main.startFollow(this.player);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 7,
                end: 0,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "idleLeft",
            frames: [{ key: "dude", frame: 8 }],
            frameRate: 12,
        });
        this.anims.create({
            key: "idleRight",
            frames: [{ key: "dude", frame: 9 }],
            frameRate: 12,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 10,
                end: 18,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard?.createCursorKeys();

        this.doors = this.physics.add.staticGroup();
        this.doors.setDepth(0);

        const wallDoor = this.doors.create(
            48,
            507,
            "wallDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        wallDoor.setScale(0.25).refreshBody();
        const backDoor = this.doors.create(
            79,
            507,
            "backwardsDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        backDoor.setScale(0.25).refreshBody().setVisible(false);

        this.physics.add.overlap(this.player, wallDoor, () => {
            wallDoor.setVisible(false);
            backDoor.setVisible(true);
            this.player?.setVisible(false);
            this.player?.setY(590);
            this.time.delayedCall(600, () => {
                wallDoor.setVisible(true);
                backDoor.setVisible(false);
                this.time.delayedCall(600, () => {
                    console.log(this.username);
                    this.scene.start("IntroScene", {
                        username: this.username,
                        lvl1: this.lvl1,
                        lvl2: this.lvl2,
                        lvl3: this.lvl3,
                        lvl4: this.lvl4,
                    });
                });
            });
        });

        //level doors

        const doorPositions = [
            {
                x: 500,
                state: this.lvl1,
                scene: "LoadingScene1",
            },
            { x: 950, state: this.lvl2, scene: "LoadingScene2" },
            { x: 1400, state: this.lvl3, scene: "LevelThreeIntro" },
            { x: 1850, state: this.lvl4, scene: "" },
            { x: 2300, state: this.lvl5, scene: "" },
        ];

        doorPositions.forEach((pos) => {
            const closedDoor = this.doors?.create(
                pos.x,
                507,
                pos.state ? "closed_metal_door" : "lockedDoor"
            ) as Phaser.Physics.Arcade.Sprite;
            closedDoor.setScale(0.25).refreshBody();
            closedDoor.setVisible(true);
            const openDoor = this.doors?.create(
                pos.x,
                507,
                "open_metal_door"
            ) as Phaser.Physics.Arcade.Sprite;
            openDoor.setScale(0.25).refreshBody();
            openDoor.setVisible(false);

            pos.state && this.player
                ? this.physics.add.overlap(this.player, closedDoor, () => {
                      closedDoor.setVisible(false);
                      openDoor.setVisible(true);
                      this.time.delayedCall(50, () => {
                          closedDoor.setVisible(true);
                          openDoor.setVisible(false);
                      });

                      if (
                          openDoor.visible &&
                          this.input.keyboard?.checkDown(
                              this.input.keyboard.addKey(
                                  Phaser.Input.Keyboard.KeyCodes.UP
                              ),
                              500
                          )
                      ) {
                          this.tweens.add({
                              targets: this.player,
                              duration: 500,
                              scaleX: 0,
                              scaleY: 0,
                              angle: 360,
                              y: "-=40",
                              onComplete: () => {
                                  this.time.delayedCall(1000, () => {
                                      this.sound.stopAll();
                                      this.scene.start(pos.scene, {
                                          username: this.username,
                                          lvl2: this.lvl2,
                                          lvl3: this.lvl3,
                                          lvl4: this.lvl4,
                                          lvl5: this.lvl5,
                                      });
                                  });
                              },
                          });
                      }
                  })
                : null;
        });
    }
    update() {
        if (!this.cursors) {
            return;
        }
        if (!this.lastDirection) {
            this.lastDirection = "right"; // Assuming player starts facing right
        }

        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-400);
            this.player?.anims.play("left", true);
            this.lastDirection = "left"; // Update last movement direction
        } else if (this.cursors.right.isDown) {
            this.player?.setVelocityX(400);
            this.player?.anims.play("right", true);
            this.lastDirection = "right"; // Update last movement direction
        } else {
            this.player?.setVelocityX(0);

            if (this.lastDirection === "left") {
                this.player?.anims.play("idleLeft", true);
            } else {
                this.player?.anims.play("idleRight", true);
            }
        }

        if (this.cursors.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocityY(-300);
        } else if (this.cursors.down.isDown) {
            this.player?.setVelocityY(300);
        }
    }
}
