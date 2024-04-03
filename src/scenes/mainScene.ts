import Phaser from "phaser";
import { debugDraw } from "../utils/debug";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class MainScene extends Phaser.Scene {
    private theseus?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.cursors =
            this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;

        this.input.setDefaultCursor("url(assets/crosshair.cur), pointer");

        this.add.image(0, 0, "base_tiles");
        const map = this.make.tilemap({ key: "tilemap" });
        const tileset = map.addTilesetImage(
            "dungeon",
            "base_tiles",
            16,
            16
        ) as Phaser.Tilemaps.Tileset;

        map.createLayer("ground", tileset);
        const wallsLayer = map.createLayer(
            "wall",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        map.createLayer("objects", tileset);

        wallsLayer.setCollisionByProperty({ collides: true });

        debugDraw(wallsLayer, this, false);

        this.theseus = this.physics.add.sprite(
            128,
            128,
            "faune",
            "walk-down-3.png"
        );
        this.theseus.body?.setSize(
            (this.theseus.width = 20),
            (this.theseus.height = 25)
        );

        this.anims.create({
            key: "faune-idle-down",
            frames: [{ key: "faune", frame: "walk-down-3.png" }],
        });
        this.anims.create({
            key: "faune-idle-up",
            frames: [{ key: "faune", frame: "walk-up-3.png" }],
        });
        this.anims.create({
            key: "faune-idle-side",
            frames: [{ key: "faune", frame: "walk-side-3.png" }],
        });
        this.anims.create({
            key: "faune-run-down",
            frames: this.anims.generateFrameNames("faune", {
                start: 1,
                end: 8,
                prefix: "run-down-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });
        this.anims.create({
            key: "faune-run-up",
            frames: this.anims.generateFrameNames("faune", {
                start: 1,
                end: 8,
                prefix: "run-up-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });
        this.anims.create({
            key: "faune-run-side",
            frames: this.anims.generateFrameNames("faune", {
                start: 1,
                end: 8,
                prefix: "run-side-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });

        this.theseus.anims.play("faune-idle-down");

        this.physics.add.collider(this.theseus, wallsLayer);
    }

    update() {
        if (!this.cursors || !this.theseus || !this.theseus.body) {
            return;
        }

        const speed = 100;

        const keyA = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );
        const keyS = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );
        const keyD = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );
        const keyW = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        );

        if (keyA?.isDown) {
            this.theseus.anims.play("faune-run-side", true);
            this.theseus.setVelocity(-speed, 0);
            this.theseus.scaleX = -1;
            this.theseus.body.offset.x = 24;
        } else if (keyD?.isDown) {
            this.theseus.anims.play("faune-run-side", true);
            this.theseus.setVelocity(speed, 0);
            this.theseus.scaleX = 1;
            this.theseus.body.offset.x = 8;
        } else if (keyW?.isDown) {
            this.theseus.anims.play("faune-run-up", true);
            this.theseus.setVelocity(0, -speed);
            this.theseus.body.offset.y = 4;
        } else if (keyS?.isDown) {
            this.theseus.anims.play("faune-run-down", true);
            this.theseus.setVelocity(0, speed);
        } else {
            const parts = this.theseus.anims.currentAnim?.key.split(
                "-"
            ) as string[];
            parts[1] = "idle";
            this.theseus.anims.play(parts.join("-"));
            this.theseus.setVelocity(0, -5);
        }
    }
}
