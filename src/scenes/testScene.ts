import Phaser from "phaser";
import LevelClass from "../Classes/LevelClass";
import { Player } from "../objects/player";

export default class TestScene extends LevelClass {
    private player: Player;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "TestScene" });
    }

    create() {
        this.player = new Player(this, 100, 0);
        this.cursors = this.input.keyboard?.createCursorKeys();

        const level_1_bg = this.add.image(640, 360, "level_1_bg");
        level_1_bg.setScale(1);

        this.add.text(400, 250, "Test Scene", {
            color: "#0f0",
        });
        this.physics.world.createDebugGraphic();

        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            640,
            720,
            "brown_plat_1"
        ) as Phaser.Physics.Arcade.Sprite;

        //setting the size of the groud (1, 2, 3)
        ground.setScale(40, 2).refreshBody();

        //platform 1
        this.platforms.create(230, 550, "brown_plat_1");

        //platform 2
        this.platforms.create(600, 550, "brown_plat_1");

        //platform 3
        this.platforms.create(970, 550, "brown_plat_1");

        this.physics.add.collider(this.player, this.platforms);
    }
    preload() {
        this.load.spritesheet("cat", "assets/Art/cat_1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    update() {
        this.player.update(this.cursors);
    }
}
