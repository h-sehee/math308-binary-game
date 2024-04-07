import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    playButton: Phaser.GameObjects.Image;
    menuMusic: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: "MenuScene" });
    }

    create() {
        this.add.image(640, 360, "menu-backplate"); // backplate image for title and background

        // main menu music
        this.menuMusic = this.sound.add("menu-music", { loop: true });
        this.menuMusic.play();

        // play button for 5x5 mode
        this.playButton = new Phaser.GameObjects.Image(
            this,
            640,
            400,
            "play-button"
        );
        this.playButton
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", this.clickPlay, this);
        this.add.existing(this.playButton);
    }

    // run when play button is pressed
    clickPlay() {
        this.sound.play("button-press", { volume: 0.4 });
        this.menuMusic.stop();
        this.scene.start("FiveByFiveLevel");
    }
}
