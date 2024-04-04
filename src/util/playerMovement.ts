// playerMovement.ts

import Phaser from "phaser";
import { gameState } from "../objects/gameState";

export class CharacterMovement {
    private player: Phaser.Physics.Arcade.Sprite;
    private scene: Phaser.Scene;
    private xstop: boolean = true;
    private ystop: boolean = true;
    private speed: number;
    private diagonalSpeed: number;
    private gameState: gameState;
    private playerScale: number;

    constructor(
        player: Phaser.Physics.Arcade.Sprite,
        scene: Phaser.Scene,
        speed: number,
        gameState: gameState,
        playerScale: number
    ) {
        this.player = player;
        this.scene = scene;
        this.speed = speed;
        this.gameState = gameState;
        this.playerScale = playerScale;
        this.diagonalSpeed = this.speed / Math.sqrt(2);
        if (!this.gameState.hasAnims) {
            this.initAnimations();
        }
    }

    private initAnimations() {
        this.gameState.hasAnims = true;
        // Define animations for walking in different directions
        this.scene.anims.create({
            key: "walkDown",
            frames: this.scene.anims.generateFrameNumbers("player", {
                start: 0,
                end: 5,
            }), // Frames for the second row
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "walkRight",
            frames: this.scene.anims.generateFrameNumbers("player", {
                start: 6,
                end: 11,
            }), // Frames for the second row
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "walkUp",
            frames: this.scene.anims.generateFrameNumbers("player", {
                start: 12,
                end: 17,
            }), // Frames for the second row
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: "walkDiag",
            frames: this.scene.anims.generateFrameNumbers("player", {
                start: 18,
                end: 23,
            }), // Frames for the second row
            frameRate: 10,
            repeat: -1,
        });

        // Define other animations for walking down, left, and right similarly...
    }

    moveUp() {
        this.ystop = false;
        this.player.setVelocityY(-this.speed); // Adjust velocity as needed
        this.player.setVelocityX(0); // Adjust velocity as needed

        this.player.anims.play("walkUp", true); // Play walk animation
    }

    moveDown() {
        this.ystop = false;
        this.player.setVelocityY(this.speed); // Adjust velocity as needed
        this.player.setVelocityX(0); // Adjust velocity as needed
        this.player.anims.play("walkDown", true); // Play walk animation
    }

    moveLeft() {
        this.xstop = false;
        this.player.setVelocityY(0); // Adjust velocity as needed
        this.player.setVelocityX(-this.speed); // Adjust velocity as needed
        this.player.setScale(-this.playerScale, this.playerScale); // Flip sprite horizontally
        this.player.anims.play("walkRight", true); // Play walk animation
    }

    moveRight() {
        this.xstop = false;
        this.player.setVelocityY(0); // Adjust velocity as needed
        this.player.setVelocityX(this.speed); // Adjust velocity as needed
        this.player.setScale(this.playerScale, this.playerScale); // Reset sprite scale if flipped
        this.player.anims.play("walkRight", true); // Play walk animation
    }
    moveUpRight() {
        this.ystop = false;
        this.xstop = false;
        this.player.setVelocityY(-this.diagonalSpeed); // Adjust velocity as needed
        this.player.setVelocityX(this.diagonalSpeed); // Adjust velocity as needed
        this.player.setScale(this.playerScale, this.playerScale); // Reset sprite scale if flipped
        this.player.anims.play("walkDiag", true); // Play walk animation
    }
    moveUpLeft() {
        this.ystop = false;
        this.xstop = false;
        this.player.setVelocityY(-this.diagonalSpeed); // Adjust velocity as needed
        this.player.setVelocityX(-this.diagonalSpeed); // Adjust velocity as needed
        this.player.setScale(-this.playerScale, this.playerScale); // Reset sprite scale if flipped
        this.player.anims.play("walkDiag", true); // Play walk animation
    }
    moveDownLeft() {
        this.ystop = false;
        this.xstop = false;
        this.player.setVelocityY(this.diagonalSpeed); // Adjust velocity as needed
        this.player.setVelocityX(-this.diagonalSpeed); // Adjust velocity as needed
        this.player.setScale(-this.playerScale, this.playerScale); // Reset sprite scale if flipped
        this.player.anims.play("walkRight", true); // Play walk animation
    }
    moveDownRight() {
        this.ystop = false;
        this.xstop = false;
        this.player.setVelocityY(this.diagonalSpeed); // Adjust velocity as needed
        this.player.setVelocityX(this.diagonalSpeed); // Adjust velocity as needed
        this.player.setScale(this.playerScale, this.playerScale); // Reset sprite scale if flipped
        this.player.anims.play("walkRight", true); // Play walk animation
    }

    stopX() {
        this.xstop = true;
        this.player.setVelocityX(0); // Stop movement

        if (this.ystop) {
            this.player.anims.stop(); // Stop animation
        }
    }
    stopY() {
        this.ystop = true;
        this.player.setVelocityY(0); // Stop movement

        if (this.xstop) {
            this.player.anims.stop(); // Stop animation
        }
    }
}
