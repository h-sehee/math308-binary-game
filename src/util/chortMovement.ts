// playerMovement.ts

import Phaser from "phaser";

export class ChortMovement {
    private chort: Phaser.Physics.Arcade.Sprite;
    private scene: Phaser.Scene;
    private xstop: boolean = true;
    private ystop: boolean = true;
    private speed: number;
    private diagonalSpeed: number;

    constructor(
        chort: Phaser.Physics.Arcade.Sprite,
        scene: Phaser.Scene,
        speed: number
    ) {
        this.chort = chort;
        this.scene = scene;
        this.speed = speed;
        this.diagonalSpeed = this.speed / Math.sqrt(2);
    }

    moveUp() {
        this.ystop = false;
        this.chort.setVelocityY(-this.speed); // Adjust velocity as needed
        this.chort.setVelocityX(0); // Adjust velocity as needed

        this.chort.anims.play("chort_idle", true); // Play walk animation
    }

    moveDown() {
        this.ystop = false;
        this.chort.setVelocityY(this.speed); // Adjust velocity as needed
        this.chort.setVelocityX(0); // Adjust velocity as needed
        this.chort.anims.play("chort_idle", true); // Play walk animation
    }

    moveLeft() {
        this.xstop = false;
        this.chort.setVelocityY(0); // Adjust velocity as needed
        this.chort.setVelocityX(-this.speed); // Adjust velocity as needed
        this.chort.anims.play("chort_walkLeft", true); // Play walk animation
    }

    moveRight() {
        this.xstop = false;
        this.chort.setVelocityY(0); // Adjust velocity as needed
        this.chort.setVelocityX(this.speed); // Adjust velocity as needed
        this.chort.anims.play("chort_walkRight", true); // Play walk animation
    }
    moveUpRight() {
        this.ystop = false;
        this.xstop = false;
        this.chort.setVelocityY(-this.diagonalSpeed); // Adjust velocity as needed
        this.chort.setVelocityX(this.diagonalSpeed); // Adjust velocity as needed
        this.chort.anims.play("chort_walkRight", true); // Play walk animation
    }
    moveUpLeft() {
        this.ystop = false;
        this.xstop = false;
        this.chort.setVelocityY(-this.diagonalSpeed); // Adjust velocity as needed
        this.chort.setVelocityX(-this.diagonalSpeed); // Adjust velocity as needed
        this.chort.anims.play("chort_walkLeft", true); // Play walk animation
    }
    moveDownLeft() {
        this.ystop = false;
        this.xstop = false;
        this.chort.setVelocityY(this.diagonalSpeed); // Adjust velocity as needed
        this.chort.setVelocityX(-this.diagonalSpeed); // Adjust velocity as needed
        this.chort.anims.play("chort_walkLeft", true); // Play walk animation
    }
    moveDownRight() {
        this.ystop = false;
        this.xstop = false;
        this.chort.setVelocityY(this.diagonalSpeed); // Adjust velocity as needed
        this.chort.setVelocityX(this.diagonalSpeed); // Adjust velocity as needed
        this.chort.anims.play("chort_walkRight", true); // Play walk animation
    }

    idle() {
        if (this.ystop && this.xstop) {
            this.chort.anims.play("chort_idle", true);
        }
    }

    stopX() {
        this.xstop = true;
        this.chort.setVelocityX(0); // Stop movement

        if (this.ystop) {
            this.idle();
        }
    }
    stopY() {
        this.ystop = true;
        this.chort.setVelocityY(0); // Stop movement

        if (this.xstop) {
            this.idle();
        }
    }
}
