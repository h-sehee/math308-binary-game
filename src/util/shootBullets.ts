import Phaser from "phaser";
import { Bullet } from "../objects/bullet";

let shootingInProgress = false;

export function shootBullets(
    scene: Phaser.Scene,
    bullets: Phaser.Physics.Arcade.Group,
    player: Phaser.Physics.Arcade.Sprite,
    numShots: number,
    shotDelay: number
) {
    if (shootingInProgress) {
        return;
    }

    shootingInProgress = true;

    let shotsFired = 0;

    for (let i = 0; i < numShots; i++) {
        // Calculate the delay for this shot
        const delay = i * shotDelay;

        // Use setTimeout to delay each shot
        setTimeout(() => {
            const worldPosition = scene.input.activePointer.positionToCamera(
                scene.cameras.main
            ) as Phaser.Math.Vector2;

            // Try to get an existing bullet instance
            let bullet = bullets.get(player.x, player.y) as Bullet;

            // Fire the bullet towards the target
            bullet.fire(worldPosition.x, worldPosition.y);

            shotsFired++;

            if (shotsFired === numShots) {
                shootingInProgress = false;
            }
        }, delay);
    }
}
