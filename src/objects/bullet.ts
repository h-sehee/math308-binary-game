import Phaser from "phaser";
export class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "bullet_blue");
        this.setScale(0.75);
    }

    // Method to fire the bullet towards a target position
    fire(targetX: number, targetY: number) {
        const angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            targetX,
            targetY
        );
        this.setAngle(Phaser.Math.RAD_TO_DEG * angle);
        if (this.body) {
            this.scene.physics.velocityFromRotation(
                angle,
                300,
                this.body.velocity
            );
        }
    }

    // Method to reset the bullet when it goes out of bounds
    reset(x: number, y: number) {
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);
    }
}
