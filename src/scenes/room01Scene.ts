import Phaser from "phaser";

import { CONFIG } from "../config";
import { CharacterMovement } from "../util/playerMovement";
import { gameState } from "../objects/gameState";

class room01Scene extends Phaser.Scene {
    private gameState: gameState;
    private player?: Phaser.Physics.Arcade.Sprite;
    private characterMovement: CharacterMovement;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: "room01Scene" });
    }
    init(data: { gameState: gameState }) {
        this.gameState = data.gameState;
    }
    preload() {}

    create() {
        const map = this.make.tilemap({ key: "room01" });
        const tileset = map.addTilesetImage("tilemap", "tiles"); //name of tilemap ON TILED, then name of key in preloader scene
        if (tileset) {
            const ground = map.createLayer("ground", tileset);
            const walls = map.createLayer("walls", tileset);
            walls?.setCollisionByProperty({ collides: true });
            ground?.setScale(1);

            const debugGraphics = this.add.graphics().setAlpha(0.7);
            if (CONFIG.physics.arcade.debug) {
                walls?.renderDebug(debugGraphics, {
                    tileColor: null,
                    collidingTileColor: new Phaser.Display.Color(
                        243,
                        234,
                        48,
                        255
                    ),
                    faceColor: new Phaser.Display.Color(30, 39, 37, 255),
                });
            }
            this.player = this.physics.add.sprite(176, 315, "robot_idle");
            this.characterMovement = new CharacterMovement(
                this.player,
                this,
                100,
                this.gameState
            );
            if (walls) {
                this.physics.add.collider(this.player, walls);
            }
            //camera follows player
            this.cameras.main.startFollow(this.player, true);

            //decreases player hitbox size
            this.player.body?.setSize(
                this.player.width * 0.85,
                this.player.height * 0.8
            );
        }
    }
    update() {
        // Check for keyboard input and move the player accordingly
        const keyboard = this.input.keyboard;

        if (keyboard) {
            // Handle diagonal movement
            if (
                keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown &&
                keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown
            ) {
                this.characterMovement.moveUpLeft();
            } else if (
                keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown &&
                keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
            ) {
                this.characterMovement.moveUpRight();
            } else if (
                keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown &&
                keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown
            ) {
                this.characterMovement.moveDownLeft();
            } else if (
                keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown &&
                keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
            ) {
                this.characterMovement.moveDownRight();
            } else {
                // Handle individual directions
                if (keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
                    this.characterMovement.moveUp();
                } else if (
                    keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown
                ) {
                    this.characterMovement.moveDown();
                } else {
                    this.characterMovement.stopY(); // Stop vertical movement if no up/down keys are pressed
                }
                if (keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
                    this.characterMovement.moveLeft();
                } else if (
                    keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown
                ) {
                    this.characterMovement.moveRight();
                } else {
                    this.characterMovement.stopX(); // Stop horizontal movement if no left/right keys are pressed
                }
            }
        }
    }
}
export default room01Scene;