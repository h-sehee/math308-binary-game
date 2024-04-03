import Phaser from "phaser";

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
        this.add.image(0, 0, "base_tiles");
        const map = this.make.tilemap({ key: "tilemap" });
        const tileset = map.addTilesetImage(
            "dungeon",
            "base_tiles"
        ) as Phaser.Tilemaps.Tileset;

        map.createLayer("ground", tileset);
        const wallsLayer = map.createLayer("wall", tileset);
        map.createLayer("objects", tileset);

        wallsLayer?.setCollisionByProperty({ collides: true });
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        wallsLayer?.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        });

        const faune = this.add.sprite(128, 128, "faune", "walk-down-3.png");
    }

    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.left.isDown) {
            this.theseus?.setVelocityX(-160);
            this.theseus?.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.theseus?.setVelocityX(160);
            this.theseus?.anims.play("right", true);
        } else {
            this.theseus?.setVelocityX(0);
            this.theseus?.anims.play("turn");
        }
        if (this.cursors.up.isDown && this.theseus?.body?.touching.down) {
            this.theseus.setVelocity(-330);
        }
    }
}
