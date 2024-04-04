import Phaser from "phaser";

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

    private sword?: Phaser.Physics.Arcade.Sprite;
    private mouse?: Phaser.Input.Pointer;
    private canAttack: boolean;

    get health() {
        return this._health;
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

        this.sword = this.scene.physics.add.sprite(
            this.x + 5,
            this.y + 7,
            "sword"
        );

        this.sword.setScale(0.5);
        this.sword.setOrigin(0, 1);

        this.canAttack = true;
    }

    handleDamage(dir: Phaser.Math.Vector2) {
        if (this._health <= 0) {
            return;
        }
        if (this.healthState === HealthState.DAMAGE) {
            return;
        }
        this.setVelocity(dir.x, dir.y);

        --this._health;
        if (this._health <= 0) {
            this.healthState = HealthState.DEAD;
            this.anims.play("faune-faint");
        } else {
            this.setTint(0xff0000);
            this.healthState = HealthState.DAMAGE;
            this.damageTime = 0;
            this.alpha = 0.5;
            this.scene.time.delayedCall(1000, () => {
                this.clearTint();
                this.alpha = 1;
            });
        }
    }

    preUpdate(t: number, dt: number) {
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
            case HealthState.DEAD:
        }
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

        if (this.mouse?.isDown && this.canAttack) {
            const swordSlash = this.scene.physics.add.sprite(
                this.sword?.x!,
                this.sword?.y!,
                "swordSlash",
                "Classic_13.png"
            );

            swordSlash.setScale(0.3);
            swordSlash.setRotation(angle - Math.PI / 4);
            swordSlash.anims.play("sword_attack", true);

            swordSlash.on(
                Phaser.Animations.Events.ANIMATION_COMPLETE,
                function () {
                    swordSlash.destroy();
                },
                this
            );

            this.scene.physics.moveTo(
                swordSlash,
                this.scene.input.x,
                this.scene.input.y,
                200
            );
            this.canAttack = false;

            this.scene.time.delayedCall(500, () => {
                this.canAttack = true;
            });
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
