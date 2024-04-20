import Phaser from "phaser";
import { createPlayerAnims } from "../anims/playerAnims";
import { createChestAnims } from "../anims/chestsAnims";
import "../player/player";
import Player from "../player/player";
import { debugDraw } from "../utils/debug";
import Chest from "../objects/Chest";
import "../objects/Chest";
// import { sceneEvents } from "../events/eventsCenter";

export default class MainScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private lockLayer: Phaser.Tilemaps.TilemapLayer;
    private altarLayer: Phaser.Tilemaps.TilemapLayer;
    private shadow3Layer: Phaser.Tilemaps.TilemapLayer;
    private objects3Layer: Phaser.Tilemaps.TilemapLayer;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private player?: Player;
    private itemList: string[];
    private playerItems: string[];
    private chestOpen = 0;
    private lockTextOn = false;

    constructor() {
        super({ key: "MainScene" });
        this.playerItems = [];
    }

    create() {
        createPlayerAnims(this.anims);
        createChestAnims(this.anims);

        this.scene.run("narration");

        this.cursors =
            this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;

        this.itemList = ["item1", "item2", "item3", "item4", "item5", "item6"];

        this.input.setDefaultCursor("default");

        this.map = this.make.tilemap({ key: "tilemap" });
        const tileset = this.map.addTilesetImage(
            "tileset",
            "base_tiles",
            16,
            16,
            1,
            2
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
        this.altarLayer = this.map.createLayer(
            "altar",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.map.createLayer("altar_shadow", tileset);
        const groundObjectsLayer = this.map.createLayer(
            "ground_objects",
            tileset
        );
        this.map.createLayer("ground_objects_shadow", tileset);

        const objects1Layer = this.map.createLayer(
            "objects",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.map.createLayer("shadow", tileset);

        const objects2Layer = this.map.createLayer(
            "objects2",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.map.createLayer("shadow2", tileset);
        this.objects3Layer = this.map.createLayer(
            "objects3",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.shadow3Layer = this.map.createLayer(
            "shadow3",
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
        groundObjectsLayer?.setDepth(400);
        this.altarLayer.setDepth(400);

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

        this.cameras.main.setBackgroundColor(0x202020);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 1280, 1280);

        const chests = this.physics.add.group({ classType: Chest });
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
            chest.setDepth(1001);
            return true;
        });

        this.physics.add.collider(
            chests,
            this.player,
            this.handlePlayerChestCollision,
            undefined,
            this
        );

        this.events.on("altar", () => {
            console.log("event called");
            this.lockLayer.setCollisionByProperty({ collides: true }, false);
            this.lockLayer.setVisible(false);
            this.player?.setDepth(3000);
        });

        this.input.keyboard?.on("keydown-E", () => {
            this.scene.pause();
            this.scene.run("item-list", { items: this.playerItems });
        });
    }

    private handlePlayerChestCollision(
        obj1:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        obj2: Phaser.GameObjects.GameObject | Phaser.Tilemaps.Tile
    ) {
        const chest = obj2 as Chest;
        chest.setVelocity(0);
        chest.setImmovable(true);
        if (!this.cursors) {
            return;
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space!)) {
            chest.play("chest-open");
            chest.body
                ?.setSize(chest.width * 0.31, chest.height * 0.6)
                .setOffset(36, 16);
            if (this.itemList.length === 0) {
                console.log("No items left in the box.");
            } else {
                const ranIdx = Math.floor(Math.random() * this.itemList.length);
                const selectedItem = this.itemList[ranIdx];
                this.playerItems.push(selectedItem);
                this.chestOpen++;
                this.itemList.splice(ranIdx, 1);
                this.scene.pause();
                this.scene.run("item-screen", { item: selectedItem });
            }
        }
    }

    private handlePlayerLockCollision() {
        if (this.cursors?.space.isDown) {
            if (this.chestOpen < 6 && !this.lockTextOn) {
                if (!this.player) {
                    return;
                }
                const lockText = this.add
                    .text(800, 210, "You should collect all 6 papers", {
                        fontSize: "12px",
                        fontFamily: "cursive",
                        shadow: {
                            color: "#00ffff",
                            fill: true,
                            offsetX: 2,
                            offsetY: 2,
                            blur: 4,
                            stroke: false,
                        },
                    })
                    .setDepth(3000)
                    .setOrigin(0.5, 1);
                this.lockTextOn = true;
                this.time.delayedCall(2500, () => {
                    lockText.setVisible(false);
                    this.lockTextOn = false;
                });
            } else if (this.chestOpen === 6) {
                this.scene.pause();
                this.scene.run("unlock");
            }
        }
    }

    update() {
        // console.log(this.player?.x, this.player?.y);
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
                this.player.setDepth(1500);
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
