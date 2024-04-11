import Phaser from "phaser";
import { debugDraw } from "../utils/debug";
import { createTheseusAnims } from "../anims/theseusAnims";
import { createWeaponsAnims } from "../anims/weaponsAnims";
import "../player/theseus";
import Theseus from "../player/theseus";
// import { sceneEvents } from "../events/eventsCenter";

export default class Tutorial extends Phaser.Scene {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private theseus?: Theseus;
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
        this.doorOpened = map.createLayer(
            "door-open",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        const doorLayer = map.createLayer(
            "door",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;

        wallsLayer.setCollisionByProperty({ collides: true }, true);
        doorLayer.setCollisionByProperty({ collides: true }, true);

        debugDraw(wallsLayer, this, false);
        debugDraw(doorLayer, this, false);

        this.theseus = this.add.theseus(
            this.cameras.main.width * 0.5,
            this.cameras.main.height * 0.7,
            "faune"
        );
        this.theseus.canUseBow = false;

        this.physics.add.overlap(
            this.theseus,
            this.doorOpened,
            this.handleEnterDoor,
            undefined,
            this
        );

        this.physics.add.collider(this.theseus, wallsLayer);
        this.physics.add.collider(this.theseus, doorLayer);

        this.time.delayedCall(1000, () => {
            doorLayer.setCollisionByProperty({ collides: true }, false);
            doorLayer.setVisible(false);
            this.scene.run("game-ui", {
                hp: this.theseus?.health,
                threads: 5,
                weaponType: this.theseus?.weaponType,
            });
        });

        this.input.keyboard?.on("keydown-ESC", () => {
            this.scene.pause();
            this.scene.run("pause", { currentScene: "tutorial" });
        });
    }

    private handleEnterDoor() {
        if (!this.theseus) {
            return;
        }
        const tile = this.doorOpened.getTileAtWorldXY(
            this.theseus.x,
            this.theseus.y,
            true
        );
        if (this.cursors?.space.isDown && tile.index != -1) {
            this.scene.start("mainScene", {
                hp: this.theseus.health,
                threads: 5,
                weaponType: "sword",
            });
        }
    }

    update() {
        if (this.theseus) {
            this.theseus.update(this.cursors!);
        }
    }
}
