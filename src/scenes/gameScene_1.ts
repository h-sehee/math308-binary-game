import Phaser from "phaser";

export default class Game_1 extends Phaser.Scene {
    constructor() {
        super({ key: "Game_1" });
    }

    private player?: Phaser.Physics.Arcade.Image;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    create() {
        this.cursors = this.input.keyboard?.createCursorKeys();
        this.player = this.physics.add.sprite(
            this.cameras.main.displayWidth / 2,
            this.cameras.main.displayHeight / 2,
            "dude"
        );
        this.player.setCollideWorldBounds(true);
    }

    update() {
        this.player?.setVelocityY(0);
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-300);
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(300);
        } else {
            this.player?.setVelocityX(0);
        }
        if (this.cursors?.up.isDown) {
            this.player?.setVelocityY(-300);
        } else if (this.cursors?.down.isDown) {
            this.player?.setVelocityY(300);
        } else {
            this.player?.setVelocityY(0);
        }
    }
}
