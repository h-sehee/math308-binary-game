import Phaser from "phaser";

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

const randomDirection = (exclude: Direction) => {
    let newDirection = Phaser.Math.Between(0, 3);
    while (newDirection === exclude) {
        newDirection = Phaser.Math.Between(0, 3);
    }

    return newDirection;
};

export default class Chort extends Phaser.Physics.Arcade.Sprite {
    private direction = randomDirection(Direction.RIGHT);
    private moveEvent: Phaser.Time.TimerEvent;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);

        // this.anims.play("chort_idle");

        scene.physics.world.on(
            Phaser.Physics.Arcade.Events.TILE_COLLIDE,
            this.handleTileCollision,
            this
        );

        this.anims.play("chort_idle", true);

        this.moveEvent = scene.time.addEvent({
            delay: 3000,
            callback: () => {
                this.direction = randomDirection(this.direction);
            },
            loop: true,
        });
    }

    destroy(fromScene?: boolean) {
        this.moveEvent.destroy();

        super.destroy(fromScene);
    }

    private handleTileCollision(go: Phaser.GameObjects.GameObject) {
        if (go !== this) {
            return;
        }
        this.direction = randomDirection(this.direction);
    }

    preUpdate(t: number, dt: number) {
        this.body?.setSize(this.width * 0.8, this.height * 0.8);
        super.preUpdate(t, dt);

        const speed = 50;

        switch (this.direction) {
            case Direction.UP:
                this.setVelocity(0, -speed);
                this.anims.play("chort_idle", true);
                break;

            case Direction.DOWN:
                this.setVelocity(0, speed);
                this.anims.play("chort_idle", true);
                break;

            case Direction.LEFT:
                this.setVelocity(-speed, 0);
                this.anims.play("chort_walkLeft", true);
                break;

            case Direction.RIGHT:
                this.setVelocity(speed, 0);
                this.anims.play("chort_walkRight", true);
                break;
        }
    }
}
