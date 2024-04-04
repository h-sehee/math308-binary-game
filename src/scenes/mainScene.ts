import Phaser from "phaser";
import { debugDraw } from "../utils/debug";
import { createRedEyesSkeletonAnims } from "../anims/enemyAnims";
import { createTheseusAnims } from "../anims/theseusAnims";
import RedEyesSkeleton from "../enemies/redEyesSkeleton";
import "../player/theseus";
import Theseus from "../player/theseus";
import { sceneEvents } from "../events/eventsCenter";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class MainScene extends Phaser.Scene {
    private theseus?: Theseus;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private redEyesSkeletons?: Phaser.Physics.Arcade.Group;
    private playerEnemyCollider?: Phaser.Physics.Arcade.Collider;

    private hit = 0;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.scene.run("game-ui");
        createTheseusAnims(this.anims);
        createRedEyesSkeletonAnims(this.anims);

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
        const doorLayer = map.createLayer(
            "door",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;

        wallsLayer.setCollisionByProperty({ collides: true });
        doorLayer.setCollisionByProperty({ collides: true });

        debugDraw(wallsLayer, this, false);
        debugDraw(doorLayer, this, false);

        this.theseus = this.add.theseus(160, 160, "faune");

        this.anims.create({
            key: "sword_attack",
            frames: this.anims.generateFrameNames("swordSlash", {
                start: 13,
                end: 18,
                prefix: "Classic_",
                suffix: ".png",
            }),
            frameRate: 15,
        });

        this.redEyesSkeletons = this.physics.add.group({
            classType: RedEyesSkeleton,
        });

        this.redEyesSkeletons.get(
            Phaser.Math.Between(80, 268),
            Phaser.Math.Between(80, 268),
            "skeleton_red_eyes"
        );

        this.redEyesSkeletons.children.iterate((c) => {
            const redEyesSkeleton = c as RedEyesSkeleton;
            redEyesSkeleton.setTarget(this.theseus!);
            redEyesSkeleton.body?.setSize(
                (redEyesSkeleton.width = 15),
                (redEyesSkeleton.height = 30)
            );
            return true;
        });

        this.physics.add.collider(this.theseus, wallsLayer);
        this.physics.add.collider(this.theseus, doorLayer);

        this.physics.add.collider(this.redEyesSkeletons, wallsLayer);
        this.physics.add.collider(this.redEyesSkeletons, doorLayer);

        this.playerEnemyCollider = this.physics.add.collider(
            this.redEyesSkeletons,
            this.theseus,
            this.handlePlayerEnemyCollision,
            undefined,
            this
        );
    }

    private handlePlayerEnemyCollision(
        obj1:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        obj2:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile
    ) {
        const redEyesSkeleton = obj2 as RedEyesSkeleton;

        const dx = this.theseus!.x - redEyesSkeleton.x;
        const dy = this.theseus!.y - redEyesSkeleton.y;

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(100);

        this.theseus?.handleDamage(dir);

        sceneEvents.emit("player-health-changed", this.theseus?.health);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(
                "player-health-changed",
                this.handlePlayerEnemyCollision,
                this
            );
        });
    }

    update() {
        if (this.hit > 0) {
            ++this.hit;
            if (this.hit > 10) {
                this.hit = 0;
            }
        }

        if (this.theseus) {
            this.theseus.update(this.cursors!);
        }
    }
}
