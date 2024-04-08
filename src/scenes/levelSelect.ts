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
    private lvl2?: boolean = false;
    private lvl3?: boolean = false;
    private lvl4?: boolean = false;
    private username: string;

    constructor() {
        super({ key: "LevelSelect" });
    }

    init(data: {
        username: string;
        lvl1: boolean;
        lvl2: boolean;
        lvl3: boolean;
        lvl4: boolean;
    }) {
        this.lvl2 = data.lvl2;
        this.lvl3 = data.lvl3;
        this.lvl4 = data.lvl4;
        this.username = data.username;
    }

    create() {
        this.platforms = this.physics.add.staticGroup();

        this.add
            .image(0, 0, "LevelSelectBackground")
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height);
        const groundWidth = this.scale.width;

        const groundX = groundWidth / 2;

        const ground = this.platforms.create(
            groundX,
            568,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;

        // Title Text

        const title = this.add.text(475, 100, "Level Select", {
            fontFamily: "Arial",
            fontSize: 60,
            color: "#000000",
        });
        title.setStroke("#FFFF00", 6);
        // Level 1 Text

        const text1 = this.add.text(192, 430, "1", {
            fontFamily: "Arial",
            fontSize: 24,
            color: "#000000",
        });
        text1.setStroke("#FFFF00", 6);

        // Level 2 Text

        const text2 = this.add.text(490, 430, "2", {
            fontFamily: "Arial",
            fontSize: 24,
            color: "#000000",
        });
        text2.setStroke("#FFFF00", 6);

        // Level 3 Text

        const text3 = this.add.text(789, 430, "3", {
            fontFamily: "Arial",
            fontSize: 24,
            color: "#000000",
        });
        text3.setStroke("#FFFF00", 6);

        // Level 4 Text

        const text4 = this.add.text(1088, 430, "4", {
            fontFamily: "Arial",
            fontSize: 24,
            color: "#000000",
        });
        text4.setStroke("#FFFF00", 6);

        ground
            .setScale(groundWidth / ground.width, 1)
            .refreshBody()
            .setTint(808080);

        this.player = this.physics.add.sprite(70, 400, "dude");
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(1);

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
        this.input.keyboard?.removeCapture(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.doors = this.physics.add.staticGroup();
        this.doors.setDepth(0);
        //door1 code

        const closed_door1 = this.doors.create(
            200,
            507,
            "closed_metal_door"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door1.setScale(0.25).refreshBody();
        closed_door1.setVisible(true);

        const open_door1 = this.doors.create(
            200,
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
            500,
            507,
            this.lvl2 ? "closed_metal_door" : "lockedDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door2.setScale(0.25).refreshBody();
        closed_door2.setVisible(true);

        const open_door2 = this.doors.create(
            500,
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
            800,
            507,
            this.lvl3 ? "closed_metal_door" : "lockedDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door3.setScale(0.25).refreshBody();
        closed_door3.setVisible(true);

        const open_door3 = this.doors.create(
            800,
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
            1100,
            507,
            this.lvl4 ? "closed_metal_door" : "lockedDoor"
        ) as Phaser.Physics.Arcade.Sprite;
        closed_door4.setScale(0.25).refreshBody();
        closed_door4.setVisible(true);

        const open_door4 = this.doors.create(
            1100,
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
    }

    update() {
        let lvl2 = this.lvl2;
        let lvl3 = this.lvl3;
        let lvl4 = this.lvl4;

        if (!this.cursors) {
            return;
        }
        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-200);
            this.player?.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player?.setVelocityX(200);
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
                            this.sound.stopAll();

                            this.scene.start("LoadingScene1", {
                                username: this.username,
                                lvl2,
                                lvl3,
                                lvl4,
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
                            this.sound.stopAll();

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
                            this.sound.stopAll();

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
                            this.sound.stopAll();

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
