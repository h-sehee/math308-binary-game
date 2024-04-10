import Phaser from "phaser";
import { debugDraw } from "../utils/debug";
import { createRedEyesSkeletonAnims } from "../anims/enemyAnims";
import { createTheseusAnims } from "../anims/theseusAnims";
import { createWeaponsAnims } from "../anims/weaponsAnims";
import RedEyesSkeleton from "../enemies/redEyesSkeleton";
import "../player/theseus";
import Theseus from "../player/theseus";
import { sceneEvents } from "../events/eventsCenter";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class MainScene extends Phaser.Scene {
    private theseus?: Theseus;
    private map: Phaser.Tilemaps.Tilemap;
    private doorLayer: Phaser.Tilemaps.TilemapLayer;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private redEyesSkeletons?: Phaser.Physics.Arcade.Group;
    private playerEnemyCollider?: Phaser.Physics.Arcade.Collider;

    constructor() {
        super({ key: "mainScene" });
    }

    create() {
        this.scene.run("game-ui");
        createTheseusAnims(this.anims);
        createRedEyesSkeletonAnims(this.anims);
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
        this.map.createLayer("door-open", tileset);
        this.doorLayer = this.map.createLayer(
            "door",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;

        wallsLayer.setCollisionByProperty({ collides: true }, true);
        this.doorLayer.setCollisionByProperty({ collides: true }, true);

        debugDraw(wallsLayer, this, false);
        debugDraw(this.doorLayer, this, false);

        this.theseus = this.add.theseus(160, 160, "faune");

        this.redEyesSkeletons = this.physics.add.group({
            classType: RedEyesSkeleton,
        });

        for (let i = 0; i < 3; i++) {
            this.redEyesSkeletons.get(
                Phaser.Math.Between(80, 268),
                Phaser.Math.Between(80, 268),
                "skeleton_red_eyes"
            );
        }

        this.redEyesSkeletons.children.iterate((c) => {
            const redEyesSkeleton = c as RedEyesSkeleton;
            redEyesSkeleton.setTarget(this.theseus!);
            redEyesSkeleton.body?.setSize(
                redEyesSkeleton.width * 0.6,
                redEyesSkeleton.height * 0.8
            );
            return true;
        });

        this.physics.add.collider(this.theseus, wallsLayer);
        this.physics.add.collider(this.theseus, this.doorLayer);

        this.physics.add.collider(this.redEyesSkeletons, wallsLayer);
        this.physics.add.collider(this.redEyesSkeletons, this.doorLayer);

        this.physics.add.collider(this.redEyesSkeletons, this.redEyesSkeletons);

        this.playerEnemyCollider = this.physics.add.collider(
            this.redEyesSkeletons,
            this.theseus,
            this.handlePlayerEnemyCollision,
            undefined,
            this
        );

        this.events.on(
            "swordSlashCreated",
            (swordSlash: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
                if (this.redEyesSkeletons) {
                    this.physics.add.collider(
                        swordSlash,
                        this.redEyesSkeletons,
                        this.handleEnemySwordAttacked,
                        undefined,
                        this
                    );
                }
            }
        );

        this.events.on(
            "arrowCreated",
            (arrow: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
                if (this.redEyesSkeletons) {
                    this.physics.add.collider(
                        arrow,
                        this.redEyesSkeletons,
                        this.handleEnemyBowAttacked,
                        undefined,
                        this
                    );
                }
            }
        );

        this.events.once("enemyDefeated", this.handleEnemyDefeated, this);
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

        if (this.theseus?.gameOVer) {
            this.time.delayedCall(1000, () => {
                this.scene.start("GameOver");
            });
        }
    }

    private handleEnemySwordAttacked(
        obj1:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        obj2:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile
    ) {
        const redEyesSkeleton = obj2 as RedEyesSkeleton;
        const swordSlash =
            obj1 as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        this.events.emit("swordSlashHit", swordSlash);

        if (this.theseus?.getWeapon) {
            redEyesSkeleton.handleDamage(this.theseus.getWeapon.damage);
        }
    }

    private handleEnemyBowAttacked(
        obj1:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        obj2:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile
    ) {
        const redEyesSkeleton = obj2 as RedEyesSkeleton;
        const arrow = obj1 as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        this.events.emit("arrowHit", arrow);

        if (this.theseus?.getWeapon) {
            redEyesSkeleton.handleDamage(this.theseus.getWeapon.damage);
        }
    }

    private handleEnemyDefeated() {
        this.doorLayer.setCollisionByProperty({ collides: true }, false);
        this.doorLayer.setVisible(false);
    }

    update() {
        const enemyRemained = this.redEyesSkeletons?.getChildren();
        if (enemyRemained!.length === 0) {
            this.events.emit("enemyDefeated");
        }

        if (this.theseus) {
            this.theseus.update(this.cursors!);
        }

        if (this.redEyesSkeletons) {
            this.redEyesSkeletons.children.iterate((c) => {
                const redEyesSkeleton = c as RedEyesSkeleton;
                redEyesSkeleton.update();
                return true;
            });
        }
    }
}
