import Phaser from "phaser";

export default class LevelSelect extends Phaser.Scene {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private player?: Phaser.Physics.Arcade.Sprite;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private doors?: Phaser.Physics.Arcade.StaticGroup;
    private door1?: boolean = false;
    private door2?: boolean = false;
    private door3?: boolean = false;
    private door4?: boolean = false;
    private door5?: boolean = false;
    private lvl2?: boolean = false;
    private lvl3?: boolean = false;
    private lvl4?: boolean = false;
    private lvl5?: boolean = false;

    constructor() {
        super({ key: "LevelSelect" });
    }

    init(data: {
        lvl1: boolean;
        lvl2: boolean;
        lvl3: boolean;
        lvl4: boolean;
        lvl5: boolean;
    }) {
        this.lvl2 = data.lvl2;
        this.lvl3 = data.lvl3;
        this.lvl4 = data.lvl4;
        this.lvl5 = data.lvl5;
    }

    create() {
        this.platforms = this.physics.add.staticGroup();

        // Set light grey background
        this.cameras.main.setBackgroundColor("#A9A9A9");

        const groundWidth = this.scale.width;

        const groundX = groundWidth / 2;

        const ground = this.platforms.create(
            groundX,
            568,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;

        ground
            .setScale(groundWidth / ground.width, 1)
            .refreshBody()
            .setTint(808080);
        const groundX2 = groundWidth + groundWidth / 2;
        const ground2 = this.platforms.create(groundX2, 568, "ground");
        ground2
            .setScale(groundWidth / ground.width, 1)
            .refreshBody()
            .setTint(808080);

        this.add.image(1175, 330, "arrow").setScale(0.5);

        const leftWall = this.platforms.create(-357, 0, "ground");
        leftWall.setOrigin(0, 0);
        leftWall.setScale(1, this.scale.height); // Adjust height to match the screen height
        leftWall.refreshBody();
        leftWall.setTint(808080);

        const rightWall = this.platforms.create(2555, 0, "ground");
        rightWall.setOrigin(0, 0);
        rightWall.setScale(1, this.scale.height); // Adjust height to match the screen height
        rightWall.refreshBody();
        rightWall.setTint(808080);

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

        this.player = this.physics.add.sprite(250, 370, "dude");
        this.player.setCollideWorldBounds(false);
        this.player.setDepth(1);
        this.cameras.main.setBounds(0, 0, 2595, this.scale.height);

        this.cameras.main.startFollow(this.player);

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
        this.doors.setDepth(0);

        //backwards door

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

            this.time.delayedCall(1000, () => {
                wallDoor.setVisible(true);
                backDoor.setVisible(false);
                this.time.delayedCall(1000, () => {
                    this.scene.start("IntroScene");
                });
            });
        });

        //door1 code

        const closed_door1 = this.doors.create(
            500,
            507,
            "closed_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door1.setScale(0.25).refreshBody();
        closed_door1.setVisible(true);

        const open_door1 = this.doors.create(
            500,
            507,
            "open_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        open_door1.setScale(0.25).refreshBody();
        open_door1.setVisible(false);

        this.physics.add.overlap(this.player, closed_door1, () => {
            closed_door1.setVisible(false);
            open_door1.setVisible(true);
            this.door1 = true;
            this.time.delayedCall(50, () => {
                closed_door1.setVisible(true);
                open_door1.setVisible(false);
                this.door1 = false;
            });
        });

        //door2 code

        const closed_door2 = this.doors.create(
            950,
            507,
            this.lvl2 ? "closed_metal_door" : "lockedDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door2.setScale(0.25).refreshBody();
        closed_door2.setVisible(true);

        const open_door2 = this.doors.create(
            950,
            507,
            "open_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        open_door2.setScale(0.25).refreshBody();
        open_door2.setVisible(false);

        this.lvl2
            ? this.physics.add.overlap(this.player, closed_door2, () => {
                  closed_door2.setVisible(false);
                  open_door2.setVisible(true);
                  this.door2 = true;
                  this.time.delayedCall(50, () => {
                      closed_door2.setVisible(true);
                      open_door2.setVisible(false);
                      this.door2 = false;
                  });
              })
            : null;

        //door3 code

        const closed_door3 = this.doors.create(
            1400,
            507,
            this.lvl3 ? "closed_metal_door" : "lockedDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door3.setScale(0.25).refreshBody();
        closed_door3.setVisible(true);

        const open_door3 = this.doors.create(
            1400,
            507,
            "open_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        open_door3.setScale(0.25).refreshBody();
        open_door3.setVisible(false);

        this.lvl3
            ? this.physics.add.overlap(this.player, closed_door3, () => {
                  closed_door3.setVisible(false);
                  open_door3.setVisible(true);
                  this.door3 = true;
                  this.time.delayedCall(50, () => {
                      closed_door3.setVisible(true);
                      open_door3.setVisible(false);
                      this.door3 = false;
                  });
              })
            : null;

        //door4 code

        const closed_door4 = this.doors.create(
            1850,
            507,
            this.lvl4 ? "closed_metal_door" : "lockedDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door4.setScale(0.25).refreshBody();
        closed_door4.setVisible(true);

        const open_door4 = this.doors.create(
            1850,
            507,
            "open_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        open_door4.setScale(0.25).refreshBody();
        open_door4.setVisible(false);

        this.lvl4
            ? this.physics.add.overlap(this.player, closed_door4, () => {
                  closed_door4.setVisible(false);
                  open_door4.setVisible(true);
                  this.door4 = true;
                  this.time.delayedCall(50, () => {
                      closed_door4.setVisible(true);
                      open_door4.setVisible(false);
                      this.door4 = false;
                  });
              })
            : null;

        //door5 code

        const closed_door5 = this.doors.create(
            2300,
            507,
            this.lvl5 ? "closed_metal_door" : "lockedDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door5.setScale(0.25).refreshBody();
        closed_door5.setVisible(true);

        const open_door5 = this.doors.create(
            2300,
            507,
            "open_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        open_door5.setScale(0.25).refreshBody();
        open_door5.setVisible(false);

        this.lvl5
            ? this.physics.add.overlap(this.player, closed_door5, () => {
                  closed_door5.setVisible(false);
                  open_door5.setVisible(true);
                  this.door5 = true;
                  this.time.delayedCall(50, () => {
                      closed_door5.setVisible(true);
                      open_door5.setVisible(false);
                      this.door5 = false;
                  });
              })
            : null;
    }

    update() {
        let lvl2 = this.lvl2;
        let lvl3 = this.lvl3;
        let lvl4 = this.lvl4;
        let lvl5 = this.lvl5;

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
            if (this.door1) {
                this.tweens.add({
                    targets: this.player,
                    duration: 500,
                    scaleX: 0,
                    scaleY: 0,
                    angle: 360,
                    y: "-=40",
                    onComplete: () => {
                        this.time.delayedCall(1000, () => {
                            this.scene.start("LoadingScene1", {
                                lvl2,
                                lvl3,
                                lvl4,
                                lvl5,
                            });
                        });
                    },
                });
            }
            if (this.door2) {
                this.tweens.add({
                    targets: this.player,
                    duration: 500,
                    scaleX: 0,
                    scaleY: 0,
                    angle: 360,
                    y: "-=40",
                    onComplete: () => {
                        this.time.delayedCall(1000, () => {
                            this.scene.start();
                        });
                    },
                });
            }
            if (this.door3) {
                this.tweens.add({
                    targets: this.player,
                    duration: 500,
                    scaleX: 0,
                    scaleY: 0,
                    angle: 360,
                    y: "-=40",
                    onComplete: () => {
                        this.time.delayedCall(1000, () => {
                            this.scene.start();
                        });
                    },
                });
            }
            if (this.door4) {
                this.tweens.add({
                    targets: this.player,
                    duration: 500,
                    scaleX: 0,
                    scaleY: 0,
                    angle: 360,
                    y: "-=40",
                    onComplete: () => {
                        this.time.delayedCall(1000, () => {
                            this.scene.start();
                        });
                    },
                });
            }
            if (this.door5) {
                this.tweens.add({
                    targets: this.player,
                    duration: 500,
                    scaleX: 0,
                    scaleY: 0,
                    angle: 360,
                    y: "-=40",
                    onComplete: () => {
                        this.time.delayedCall(1000, () => {
                            this.scene.start();
                        });
                    },
                });
            } else {
                this.player.setVelocityY(-300);
            }
        } else if (this.cursors.down.isDown) {
            this.player?.setVelocityY(300);
        }
    }
}
