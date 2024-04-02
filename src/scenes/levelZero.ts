import Phaser from "phaser";

export default class LevelZero extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super({ key: "Level0" });
    }

    preload() {
        this.load.image("gal", "assets/Pink_Monster_Walk_6.png");
        this.load.image("play", "assets/play-button.png");
    }

    create() {
        const backgroundImage = this.add
            .image(0, 0, "play")
            .setOrigin(0, 0);
        backgroundImage.setScale(
            this.cameras.main.width / backgroundImage.width,
            this.cameras.main.height / backgroundImage.height
        );
        
        this.player = this.physics.add.sprite(100, 100, "gal");
        this.player.setCollideWorldBounds(true);

        /* this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers("gal", {start:0, end:3}),
            repeat: -1
        })

        this.cursors = this.input.keyboard?.createCursorKeys() */
    }

    update() {
}
}
