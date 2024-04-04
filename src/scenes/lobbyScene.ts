import Phaser from "phaser";
import Player from "../objects/player";

import { CONFIG } from "../config";
import { CharacterMovement } from "../util/playerMovement";
import { gameState } from "../objects/gameState";

class LobbyScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private characterMovement: CharacterMovement;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: "LobbyScene" });
    }

    preload() {}

    create() {
        const player = new Player(
            "Player 1",
            5,
            2,
            ["Sword", "Bow"],
            ["Potion", "Key"]
        );
        const initialLevel = 0;
        const hasAnims = false;
        const initialGameState = new gameState(player, initialLevel, hasAnims);

        const map = this.make.tilemap({ key: "lobby" });
        const tileset = map.addTilesetImage("tilemap", "tiles"); //name of tilemap ON TILED, then name of key in preloader scene
        if (tileset) {
            const ground = map.createLayer("Ground", tileset);
            const walls = map.createLayer("Walls", tileset);
            const objects = map.createLayer("Objects", tileset);
            const smallObjs = map.createLayer("Smalls", tileset);
            walls?.setCollisionByProperty({ collides: true });
            objects?.setCollisionByProperty({ collides: true });
            walls?.setScale(1);
            ground?.setScale(1);
            objects?.setScale(1);
            smallObjs?.setScale(1);

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
            this.player = this.physics.add.sprite(100, 100, "player");
            this.player.setScale(0.25);
            this.characterMovement = new CharacterMovement(
                this.player,
                this,
                100,
                initialGameState,
                0.25
            );
            if (walls) {
                this.physics.add.collider(this.player, walls);
            }
            if (objects) {
                this.physics.add.collider(this.player, objects);
            }

            this.cursors = this.input.keyboard?.createCursorKeys();
        }
    }
    update() {
        // Check for keyboard input and move the player accordingly
        if (this.cursors) {
            // Handle diagonal movement
            if (this.cursors.up.isDown && this.cursors.left.isDown) {
                this.characterMovement.moveUpLeft();
            } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
                this.characterMovement.moveUpRight();
            } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
                this.characterMovement.moveDownLeft();
            } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
                this.characterMovement.moveDownRight();
            } else {
                // Handle individual directions
                if (this.cursors.up.isDown) {
                    this.characterMovement.moveUp();
                } else if (this.cursors.down.isDown) {
                    this.characterMovement.moveDown();
                } else {
                    this.characterMovement.stopY(); // Stop vertical movement if no up/down keys are pressed
                }
                if (this.cursors.left.isDown) {
                    this.characterMovement.moveLeft();
                } else if (this.cursors.right.isDown) {
                    this.characterMovement.moveRight();
                } else {
                    this.characterMovement.stopX(); // Stop horizontal movement if no left/right keys are pressed
                }
            }
        }
    }
}
export default LobbyScene;
