import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    private wizard?: Phaser.Physics.Arcade.Sprite;
    private NPCs: Phaser.Physics.Arcade.Group;
    private enemies: Phaser.Physics.Arcade.Group;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd?: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };

    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        //level design
        this.add.image(600, 400, "background").setScale(2);

        this.platforms = this.physics.add.staticGroup();
        const level: Phaser.Physics.Arcade.Image = this.platforms
            .create(400, 400, "platform")
            .setScale(2, 1);

        this.physics.world.setBounds(
            65, //div by 6?
            170, //div by 2 ish?
            level.displayWidth,
            level.displayHeight
        );

        //characters
        this.wizard = this.physics.add.sprite(300, 450, "wizard");
        this.wizard.setCollideWorldBounds(true);

        this.NPCs = this.physics.add.group();
        const robo: Phaser.Physics.Arcade.Sprite = this.NPCs.create(
            500,
            500,
            "robo_guy"
        ).setScale(0.75);
        this.physics.add.collider(this.wizard, robo);
        robo.setImmovable(true);

        this.enemies = this.physics.add.group();
        const rugged_wizard: Phaser.Physics.Arcade.Sprite = this.enemies
            .create(600, 400, "rugged_wizard")
            .setScale(0.145);
        this.physics.add.collider(this.wizard, rugged_wizard);
        rugged_wizard.setImmovable(true);

        //animation
        this.anims.create({
            key: "idle",
            frames: [{ key: "wizard", frame: 0 }],
            frameRate: 1,
            repeat: -1,
        });

        //input
        this.wasd = this.input.keyboard?.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
        }) as {
            W: Phaser.Input.Keyboard.Key;
            A: Phaser.Input.Keyboard.Key;
            S: Phaser.Input.Keyboard.Key;
            D: Phaser.Input.Keyboard.Key;
        };
        this.cursor = this.input.keyboard?.createCursorKeys();

        this.add.text(165, 280, "Level A", {
            fontSize: "90px",
            color: "red",
        });
    }

    update() {
        if (!this.cursor && !this.wasd) {
            return;
        }
        if (this.cursor?.left.isDown || this.wasd?.A.isDown) {
            this.wizard?.setVelocityX(-260);
            //this.wizard?.anims.play("left", true);
        } else if (this.cursor?.right.isDown || this.wasd?.D.isDown) {
            this.wizard?.setVelocityX(260);
            //this.wizard?.anims.play("right", true);
        } else if (this.cursor?.up.isDown || this.wasd?.W.isDown) {
            this.wizard?.setVelocityY(-260);
            //this.wizard?.anims.play("turn", true);
        } else if (this.cursor?.down.isDown || this.wasd?.S.isDown) {
            this.wizard?.setVelocityY(260);
            //this.wizard?.anims.play("turn", true);
        } else {
            this.wizard?.setVelocityX(0);
            this.wizard?.setVelocityY(0);
            this.wizard?.anims.play("idle");
        }
    }
}
