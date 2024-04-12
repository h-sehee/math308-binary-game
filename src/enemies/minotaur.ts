import Phaser from "phaser";
// import { sceneEvents } from "../events/eventsCenter";

enum HealthState {
    IDLE,
    DAMAGE,
    DEAD,
}

export default class Minotaur extends Phaser.Physics.Arcade.Sprite {
    private target?: Phaser.Physics.Arcade.Sprite;

    private healthState = HealthState.IDLE;
    private damageTime = 0;
    private _health = 500;
    private maxHealth = 500;
    private healthBar: Phaser.GameObjects.Graphics;

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
        this.anims.play("minotaur-idle-down");
        this.createHealthBar();
    }

    setTarget(target: Phaser.Physics.Arcade.Sprite) {
        this.target = target;
    }

    handleDamage(damage: number) {
        if (this._health <= 0) {
            return;
        }
        if (this.healthState === HealthState.DAMAGE) {
            return;
        }

        this._health -= damage;

        if (this._health <= 0) {
            this.healthState = HealthState.DEAD;
            this.setVelocity(0, 0);
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    this.healthBar.destroy();
                    this.destroy();
                },
            });
        } else {
            this.setTint(0xff0000);
            this.healthState = HealthState.DAMAGE;
            this.damageTime = 0;
        }
    }

    createHealthBar() {
        this.healthBar = this.scene.add.graphics();
        this.healthBar.x = this.scene.cameras.main.width * 0.15;
        this.healthBar.y = this.scene.cameras.main.height * 0.1;
        this.scene.add
            .text(
                this.scene.cameras.main.width * 0.5,
                this.healthBar.y - 15,
                "Minotaur",
                {
                    fontSize: "22px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5);
        this.updateHealthBarSize();
    }

    updateHealthBarSize() {
        this.healthBar.clear();

        this.healthBar.fillStyle(0x000000, 0.8);
        this.healthBar.fillRect(
            0,
            0,
            this.scene.cameras.main.width * 0.7,
            this.scene.cameras.main.height * 0.05
        );

        const width =
            (this.health / this.maxHealth) *
            this.scene.cameras.main.width *
            0.7;

        this.healthBar.fillStyle(0xff0000, 1);
        this.healthBar.fillRect(
            0,
            0,
            width,
            this.scene.cameras.main.height * 0.05
        );

        this.healthBar.lineStyle(2, 0xffffff);
        this.healthBar.strokeRect(
            0,
            0,
            this.scene.cameras.main.width * 0.7,
            this.scene.cameras.main.height * 0.05
        );
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

        if (!this.target || !this.body) {
            return;
        }

        if (this.x <= this.target.x && Math.abs(this.x - this.target.x) > 30) {
            this.anims.play("minotaur-run-side", true);
            this.scaleX = -1;
            this.body.offset.x = 90;
        } else if (
            this.x > this.target.x &&
            Math.abs(this.x - this.target.x) > 30
        ) {
            this.anims.play("minotaur-run-side", true);
            this.scaleX = 1;
            this.body.offset.x = 50;
        } else if (this.y <= this.target.y) {
            this.anims.play("minotaur-run-down", true);
            this.body.offset.y = 25;
        } else if (this.y > this.target.y) {
            this.anims.play("minotaur-run-up", true);
            this.body.offset.y = 25;
        }
        this.scene.physics.moveTo(this, this.target.x, this.target.y, 60);
    }

    update() {
        this.updateHealthBarSize();
    }
}
