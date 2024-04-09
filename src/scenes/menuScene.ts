import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    play5Button: Phaser.GameObjects.Image;
    play3Button: Phaser.GameObjects.Image;
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
        this.play5Button = new Phaser.GameObjects.Image(
            this,
            640,
            500,
            "play-5-button"
        );
        this.play5Button
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", () => {
                this.clickPlay("FiveByFiveLevel");
            });
        this.add.existing(this.play5Button);

        // play button for 3x3 mode
        this.play3Button = new Phaser.GameObjects.Image(
            this,
            640,
            300,
            "play-3-button"
        );
        this.play3Button
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", () => {
                this.clickPlay("ThreeByThreeLevel");
            });
        this.add.existing(this.play3Button);
    }

    // run when play button is pressed
    //modified so that it accepts scenekey as a paramaeter
    clickPlay(sceneKey: string) {
        this.sound.play("button-press", { volume: 0.4 });
        this.menuMusic.stop();
        this.scene.start(sceneKey);
    }
}
