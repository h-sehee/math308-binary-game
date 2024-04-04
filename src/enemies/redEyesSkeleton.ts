import Phaser from "phaser";

// enum Direction {
//     UP,
//     DOWN,
//     LEFT,
//     RIGHT,
// }

export default class RedEyesSkeleton extends Phaser.Physics.Arcade.Sprite {
    // private direction = Direction.DOWN;
    private target?: Phaser.Physics.Arcade.Sprite;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
        this.anims.play("redEyesSkeleton-idle-down");
    }

    setTarget(target: Phaser.Physics.Arcade.Sprite) {
        this.target = target;
    }

    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);

        if (!this.target || !this.body) {
            return;
        }

        if (this.x <= this.target.x && Math.abs(this.x - this.target.x) > 30) {
            this.anims.play("redEyesSkeleton-run-side", true);
            this.scaleX = -1;
            this.body.offset.x = 16;
        } else if (
            this.x > this.target.x &&
            Math.abs(this.x - this.target.x) > 30
        ) {
            this.anims.play("redEyesSkeleton-run-side", true);
            this.scaleX = 1;
            this.body.offset.x = 0;
        } else if (this.y <= this.target.y) {
            this.anims.play("redEyesSkeleton-run-down", true);
            this.body.offset.y = 4;
        } else if (this.y > this.target.y) {
            this.anims.play("redEyesSkeleton-run-up", true);
            this.body.offset.y = 4;
        }
        this.scene.physics.moveTo(this, this.target.x, this.target.y, 50);
    }
}
