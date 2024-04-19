import Phaser from "phaser";
import { createPlayerAnims } from "../anims/playerAnims";
import { createChestAnims } from "../anims/chestsAnims";
import "../player/player";
import Player from "../player/player";
import { debugDraw } from "../utils/debug";
import Chest from "../objects/Chest";

export default class MainScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private lockLayer: Phaser.Tilemaps.TilemapLayer;
    private shadow3Layer: Phaser.Tilemaps.TilemapLayer;
    private objects3Layer: Phaser.Tilemaps.TilemapLayer;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private player?: Player;
    private itemList: string[];

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        createPlayerAnims(this.anims);
        createChestAnims(this.anims);

        this.cursors =
            this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;

        this.input.setDefaultCursor("pointer");

        // this.add.image(0, 0, "base_tiles");
        this.map = this.make.tilemap({ key: "tilemap" });
        const tileset = this.map.addTilesetImage(
            "tileset",
            "base_tiles",
            16,
            16
        ) as Phaser.Tilemaps.Tileset;

        this.map.createLayer("ground", tileset);
        const stairsLayer = this.map.createLayer(
            "stairs",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        const wallsLayer = this.map.createLayer(
            "wall",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.map.createLayer("shadow", tileset);
        this.map.createLayer("ground_objects", tileset);
        this.map.createLayer("ground_objects_shadow", tileset);
        const objects1Layer = this.map.createLayer(
            "objects",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.map.createLayer("shadow2", tileset);
        const objects2Layer = this.map.createLayer(
            "objects2",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.shadow3Layer = this.map.createLayer(
            "shadow3",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.objects3Layer = this.map.createLayer(
            "objects3",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.lockLayer = this.map.createLayer(
            "lock",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        stairsLayer.setCollisionByProperty({ collides: true }, true);
        wallsLayer.setCollisionByProperty({ collides: true }, true);
        this.lockLayer.setCollisionByProperty({ collides: true }, true);
        objects1Layer.setCollisionByProperty({ collides: true }, true);
        objects2Layer.setCollisionByProperty({ collides: true }, true);
        this.shadow3Layer.setCollisionByProperty({ collides: true }, true);
        this.objects3Layer.setCollisionByProperty({ collides: true }, false);

        debugDraw(stairsLayer, this, false);
        debugDraw(wallsLayer, this, false);
        debugDraw(this.lockLayer, this, false);
        debugDraw(objects1Layer, this, false);
        debugDraw(objects2Layer, this, false);
        debugDraw(this.shadow3Layer, this, false);
        debugDraw(this.objects3Layer, this, false);

        objects1Layer.setDepth(1000);
        objects2Layer.setDepth(1001);
        this.objects3Layer.setDepth(1002);

        this.player = this.add.player(623, 280, "faune");

        this.physics.add.collider(this.player, stairsLayer);
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(
            this.player,
            this.lockLayer,
            this.handlePlayerLockCollision,
            undefined,
            this
        );
        this.physics.add.collider(this.player, objects1Layer);
        this.physics.add.collider(this.player, objects2Layer);
        this.physics.add.collider(this.player, this.shadow3Layer);
        this.physics.add.collider(this.player, this.objects3Layer);

        this.cameras.main.setSize(1280, 720);
        this.cameras.main.setViewport(
            (1280 - 1280) / 2,
            (1280 - 720) / 2,
            1280,
            720
        );
        this.cameras.main.setBackgroundColor(0x202020);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 1280, 1280);

        const chests = this.physics.add.staticGroup();
        chests.get(563, 348, "chest", "chests_00.png");
        chests.get(595, 829, "chest", "chests_00.png");
        chests.get(883, 1052, "chest", "chests_00.png");
        chests.get(1108, 508, "chest", "chests_00.png");
        chests.get(995, 445, "chest", "chests_00.png");
        chests.get(755, 715, "chest", "chests_00.png");

        chests.children.iterate((c) => {
            const chest = c as Chest;
            chest.body
                ?.setSize(chest.width * 0.31, chest.height * 0.55)
                .setOffset(36, 16);
            chest.setDepth(501);
            return true;
        });

        this.physics.add.collider(
            this.player,
            chests,
            this.handlePlayerChestCollision,
            undefined,
            this
        );
    }

    private handlePlayerChestCollision(
        obj1:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile
            | Player,
        obj2: Phaser.GameObjects.GameObject | Phaser.Tilemaps.Tile
    ) {
        const chest = obj2 as Chest;
        this.player?.setChest(chest);
    }

    private handlePlayerLockCollision() {
        this.input.keyboard?.on("keydown-SPACE", () => {
            console.log("locklayer handle");
        });
    }

    update() {
        if (this.player) {
            this.player.update(this.cursors!);
            if (
                (this.player.x < 842 || this.player.x > 923) &&
                this.player.y > 422 &&
                this.player.y < 454
            ) {
                this.shadow3Layer.setCollisionByProperty(
                    { collides: true },
                    false
                );
                this.objects3Layer.setCollisionByProperty(
                    { collides: true },
                    true
                );
                this.player.setDepth(3000);
            } else if (
                (this.player.y < 384 || this.player.y > 496) &&
                this.player.x > 870 &&
                this.player.x < 922
            ) {
                this.shadow3Layer.setCollisionByProperty(
                    { collides: true },
                    true
                );
                this.objects3Layer.setCollisionByProperty(
                    { collides: true },
                    false
                );
                this.player.setDepth(500);
            }
        }
    }
}
