import Phaser from "phaser";
import { sceneEvents } from "../events/eventsCenter";
import "../weapons/sword";
import Sword from "../weapons/sword";

declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            theseus(
                x: number,
                y: number,
                texture: string,
                frame?: string | number
            ): Theseus;
        }
    }
}

enum HealthState {
    IDLE,
    DAMAGE,
    DEAD,
}

export default class Theseus extends Phaser.Physics.Arcade.Sprite {
    private healthState = HealthState.IDLE;
    private damageTime = 0;

    private _health = 3;

    private sword?: Sword;
    private mouse?: Phaser.Input.Pointer;

    private canAttack = true;
    private _gameOver = false;

    get health() {
        return this._health;
    }

    get gameOVer() {
        return this._gameOver;
    }

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

        this.sword = this.scene.add.sword(this.x + 5, this.y + 7, "sword");

        this.canAttack = true;
    }

    handleDamage(dir: Phaser.Math.Vector2) {
        if (this._health <= 0) {
            return;
        }
        if (this.healthState === HealthState.DAMAGE) {
            return;
        }

        --this._health;

        if (this._health <= 0) {
            this.healthState = HealthState.DEAD;
            this.anims.play("faune-faint");
            this.setVelocity(0, 0);
            sceneEvents.emit("gameOver");
            this.scene.physics.pause();
            this._gameOver = true;
        } else {
            this.setVelocity(dir.x, dir.y);
            this.setTint(0xff0000);
            this.healthState = HealthState.DAMAGE;
            this.damageTime = 0;
            this.alpha = 0.5;
            this.scene.time.delayedCall(1000, () => {
                this.alpha = 1;
            });
        }
    }

    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);
        switch (this.healthState) {
            case HealthState.IDLE:
                break;
            case HealthState.DAMAGE:
                this.damageTime += dt;
                if (this.damageTime >= 250) {
                    this.healthState = HealthState.IDLE;
                    this.setTint(0xffffff);
                    this.damageTime = 0;
                }
                break;
        }
    }

    private handleAttack(angle: number) {
        this.sword?.handleSwordSlash(angle);
        this.canAttack = false;

        this.scene.time.delayedCall(500, () => {
            this.canAttack = true;
        });
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (
            this.healthState === HealthState.DAMAGE ||
            this.healthState === HealthState.DEAD
        ) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!cursors || !this.body) {
            return;
        }

        const speed = 100;

        this.sword?.setY(this.y + 7);

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
            this.body.offset.x = 24;
            this.sword?.setX(this.x - 5);
        } else if (keyD?.isDown) {
            this.anims.play("faune-run-side", true);
            this.setVelocity(speed, 0);
            this.scaleX = 1;
            this.body.offset.x = 8;
            this.sword?.setX(this.x + 5);
        } else if (keyW?.isDown) {
            this.anims.play("faune-run-up", true);
            this.setVelocity(0, -speed);
            this.body.offset.y = 4;
            this.sword?.setX(this.x + 5);
            this.sword?.setY(this.y);
        } else if (keyS?.isDown) {
            this.anims.play("faune-run-down", true);
            this.setVelocity(0, speed);
            this.sword?.setX(this.x + 5);
        } else {
            const parts = this.anims.currentAnim?.key.split("-") as string[];
            parts[1] = "idle";
            this.anims.play(parts.join("-"));
            this.setVelocity(0, 0);
            this.sword?.setX(this.x + 5);
        }

        let angle = Phaser.Math.Angle.Between(
            this.sword?.x!,
            this.sword?.y!,
            this.scene.input.x,
            this.scene.input.y
        );

        this.sword?.setRotation(angle + Math.PI / 4);
        // this.sword?.body?.offset.;

        if (this.mouse?.isDown && this.canAttack) {
            this.handleAttack(angle);
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register(
    "theseus",
    function (
        this: Phaser.GameObjects.GameObjectFactory,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        var sprite = new Theseus(this.scene, x, y, texture, frame);

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(
            sprite,
            Phaser.Physics.Arcade.DYNAMIC_BODY
        );

        sprite.body?.setSize(sprite.width * 0.5, sprite.height * 0.8);

        return sprite;
    }
);
