import Phaser from "phaser";
import { debugDraw } from "../utils/debug";
import { createTheseusAnims } from "../anims/theseusAnims";
import { createWeaponsAnims } from "../anims/weaponsAnims";
import "../player/theseus";
import Theseus from "../player/theseus";

export default class Tutorial extends Phaser.Scene {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private theseus?: Theseus;
    private map: Phaser.Tilemaps.Tilemap;
    private doorLayer: Phaser.Tilemaps.TilemapLayer;
    private doorOpened: Phaser.Tilemaps.TilemapLayer;

    constructor() {
        super({ key: "tutorial" });
    }

    create() {
        createTheseusAnims(this.anims);
        createWeaponsAnims(this.anims);

        this.cursors =
            this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;

        this.input.setDefaultCursor("crosshair");

        this.add.image(0, 0, "base_tiles");
        this.map = this.make.tilemap({ key: "tilemap" });
        const tileset = this.map.addTilesetImage(
            "dungeon",
            "base_tiles",
            16,
            16
        ) as Phaser.Tilemaps.Tileset;

        this.map.createLayer("ground", tileset);
        const wallsLayer = this.map.createLayer(
            "wall",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.map.createLayer("objects", tileset);
        this.doorOpened = this.map.createLayer(
            "door-open",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.doorLayer = this.map.createLayer(
            "door",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;

        wallsLayer.setCollisionByProperty({ collides: true }, true);
        this.doorLayer.setCollisionByProperty({ collides: true }, true);

        debugDraw(wallsLayer, this, false);
        debugDraw(this.doorLayer, this, false);

        this.theseus = this.add.theseus(160, 160, "faune");

        this.physics.add.overlap(
            this.theseus,
            this.doorOpened,
            this.handleEnterDoor,
            undefined,
            this
        );

        this.physics.add.collider(this.theseus, wallsLayer);
        this.physics.add.collider(this.theseus, this.doorLayer);

        this.time.delayedCall(1000, () => {
            this.doorLayer.setCollisionByProperty({ collides: true }, false);
            this.doorLayer.setVisible(false);
        });
    }

    private handleEnterDoor() {
        if (this.cursors?.space.isDown) {
            this.scene.start("mainScene");
        }
    }

    update() {
        if (this.theseus) {
            this.theseus.update(this.cursors!);
        }
    }
}
