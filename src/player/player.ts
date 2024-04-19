import Phaser from "phaser";
import Chest from "../objects/Chest";
import "../objects/Chest";
// import { sceneEvents } from "../events/eventsCenter";

declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            player(
                x: number,
                y: number,
                texture: string,
                frame?: string | number
            ): Player;
        }
    }
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private mouse?: Phaser.Input.Pointer;
    private activeChest?: Chest;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
        this.anims.play("faune-idle-down");

        this.mouse = this.scene.input.mousePointer;

        this.setDepth(500);
    }

    setChest(chest: Chest) {
        this.activeChest = chest;
    }

    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!cursors || !this.body) {
            return;
        }

        const speed = 100;

        const keyA = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        );
        const keyS = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );
        const keyD = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        );
        const keyW = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        );

        if (keyA?.isDown) {
            this.anims.play("faune-run-side", true);
            this.setVelocity(-speed, 0);
            this.scaleX = -1;
            this.body.offset.x = 22;
        } else if (keyD?.isDown) {
            this.anims.play("faune-run-side", true);
            this.setVelocity(speed, 0);
            this.scaleX = 1;
            this.body.offset.x = 10;
        } else if (keyW?.isDown) {
            this.anims.play("faune-run-up", true);
            this.setVelocity(0, -speed);
            this.body.offset.y = 10;
        } else if (keyS?.isDown) {
            this.anims.play("faune-run-down", true);
            this.setVelocity(0, speed);
        } else {
            const parts = this.anims.currentAnim?.key.split("-") as string[];
            parts[1] = "idle";
            this.anims.play(parts.join("-"));
            this.setVelocity(0, 0);
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.space!)) {
            if (this.activeChest) {
                this.activeChest.play("chest-open");
                this.activeChest.body
                    ?.setSize(
                        this.activeChest.width * 0.31,
                        this.activeChest.height * 0.6
                    )
                    .setOffset(36, 16);
            }
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register(
    "player",
    function (
        this: Phaser.GameObjects.GameObjectFactory,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        var sprite = new Player(this.scene, x, y, texture, frame);

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(
            sprite,
            Phaser.Physics.Arcade.DYNAMIC_BODY
        );

        sprite.body?.setSize(sprite.width * 0.35, sprite.height * 0.5);

        return sprite;
    }
);
