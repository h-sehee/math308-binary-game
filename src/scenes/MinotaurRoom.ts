import Phaser from "phaser";
import { debugDraw } from "../utils/debug";
import { createMinotaurAnims } from "../anims/minotaurAnims";
import { createTheseusAnims } from "../anims/theseusAnims";
import { createWeaponsAnims } from "../anims/weaponsAnims";
import minotaur from "../enemies/minotaur";
import Minotaur from "../enemies/minotaur";
import "../enemies/minotaur";
import "../player/theseus";
import Theseus from "../player/theseus";
import { sceneEvents } from "../events/eventsCenter";

export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;

export default class MinotaurRoom extends Phaser.Scene {
    private theseus?: Theseus;
    private map: Phaser.Tilemaps.Tilemap;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private minotaur?: Phaser.Physics.Arcade.Group;
    private playerEnemyCollider?: Phaser.Physics.Arcade.Collider;
    private hp: number;
    private threads: number;
    private weapon: string;
    private itemList: string[];

    // private healthBar: Phaser.GameObjects.Graphics;

    private dropList = [
        { item: "sword-damage-up", weight: 15 },
        { item: "sword-speed-up", weight: 15 },
        { item: "sword-fire", weight: 10 },
        { item: "sword-ice", weight: 10 },
        { item: "bow-damage-up", weight: 15 },
        { item: "bow-speed-up", weight: 15 },
        { item: "bow-poison", weight: 10 },
        { item: "bow-triple", weight: 10 },
    ];

    constructor() {
        super({ key: "minotaur" });
    }

    init(data: {
        hp: number;
        threads: number;
        weaponType: string;
        itemList: string[];
    }) {
        this.hp = data.hp;
        this.threads = data.threads;
        this.weapon = data.weaponType;
        this.itemList = data.itemList;
    }

    create() {
        this.scene.run("game-ui", {
            hp: this.theseus?.health,
            threads: this.threads,
            weaponType: this.theseus?.weaponType,
        });
        createTheseusAnims(this.anims);
        createMinotaurAnims(this.anims);
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
            "minotaur-wall",
            tileset
        ) as Phaser.Tilemaps.TilemapLayer;
        this.map.createLayer("minotaur-objects", tileset);

        wallsLayer.setCollisionByProperty({ collides: true }, true);

        debugDraw(wallsLayer, this, false);

        this.theseus = this.add.theseus(
            this.cameras.main.width * 0.5,
            this.cameras.main.height * 0.9,
            "faune"
        );
        this.theseus.health = this.hp;
        this.theseus.weaponType = this.weapon;
        this.theseus.anims.play("faune-idle-up");

        this.minotaur = this.physics.add.group({
            classType: Minotaur,
        });

        this.minotaur.get(
            this.cameras.main.width * 0.5,
            this.cameras.main.height * 0.3,
            "minotaur"
        );

        this.minotaur.children.iterate((c) => {
            const minotaur = c as Minotaur;
            minotaur.setTarget(this.theseus!);
            minotaur.body?.setSize(minotaur.width * 0.3, minotaur.height * 0.7);
            minotaur.setOrigin(0.5);
            return true;
        });

        // this.createHealthBar();

        this.physics.add.collider(this.theseus, wallsLayer);

        this.physics.add.collider(this.minotaur, wallsLayer);

        this.physics.add.collider(this.minotaur, this.minotaur);

        this.playerEnemyCollider = this.physics.add.collider(
            this.minotaur,
            this.theseus,
            this.handlePlayerEnemyCollision,
            undefined,
            this
        );

        this.events.on(
            "swordSlashCreated",
            (swordSlash: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
                if (this.minotaur) {
                    this.physics.add.collider(
                        swordSlash,
                        this.minotaur,
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
                if (this.minotaur) {
                    this.physics.add.collider(
                        arrow,
                        this.minotaur,
                        this.handleEnemyBowAttacked,
                        undefined,
                        this
                    );
                }
            }
        );

        this.events.on("gameRetry", () => {
            if (!this.theseus) {
                return;
            }
            this.theseus.health = this.hp;
            this.threads = 5;
        });

        this.input.keyboard?.on("keydown-ESC", () => {
            this.scene.pause();
            this.scene.run("pause", { currentScene: "minotaur" });
        });

        this.input.keyboard?.on("keydown-E", () => {
            this.scene.pause();
            this.scene.run("weapon-design", {
                from: "minotaur",
                itemList: this.itemList,
            });
        });
    }

    // createHealthBar() {
    //     this.healthBar = this.add.graphics();
    // this.healthBar.x = this.cameras.main.width * 0.15;
    // this.healthBar.y = this.cameras.main.height * 0.08;
    //     this.updateHealthBarSize();
    // }

    // updateHealthBarSize() {
    //     if (!this.minotaur) {
    //         return;
    //     }

    //     this.healthBar.clear();

    //     this.healthBar.fillStyle(0x000000, 0.8);
    //     this.healthBar.fillRect(
    //         0,
    //         0,
    //         this.cameras.main.width * 0.7,
    //         this.cameras.main.height * 0.05
    //     );

    //     let minotaur = null;

    //     this.minotaur.children.iterate((c) => {
    //         const m = c as Minotaur;
    //         minotaur = m;
    //         return true;
    //     });

    //     if (!minotaur) {
    //         return;
    //     }
    //     const width = (minotaur?.health / 100) * this.cameras.main.width * 0.7;

    //     this.healthBar.fillStyle(0xff0000, 1);
    //     this.healthBar.fillRect(0, 0, width, this.cameras.main.height * 0.05);
    // }

    private handlePlayerEnemyCollision(
        obj1:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        obj2:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile
    ) {
        const minotaur = obj2 as Minotaur;

        const dx = this.theseus!.x - minotaur.x;
        const dy = this.theseus!.y - minotaur.y;

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
        const minotaur = obj2 as Minotaur;
        const swordSlash =
            obj1 as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        this.events.emit("swordSlashHit", swordSlash);

        if (this.theseus?.getWeapon) {
            minotaur.handleDamage(this.theseus.getWeapon.damage);
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
        const minotaur = obj2 as minotaur;
        const arrow = obj1 as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        this.events.emit("arrowHit", arrow);

        if (this.theseus?.getWeapon) {
            minotaur.handleDamage(this.theseus.getWeapon.damage);
        }
    }

    update() {
        const enemyRemained = this.minotaur?.getChildren();
        if (enemyRemained!.length === 0) {
            this.events.emit("enemyDefeated");
        }

        if (this.theseus) {
            this.theseus.update(this.cursors!);
        }

        if (this.minotaur) {
            this.minotaur.children.iterate((c) => {
                const minotaur = c as minotaur;
                minotaur.update();
                return true;
            });
        }
    }
}
