import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("and-block", "assets/blocks/And.png");
        this.load.image("or-block", "assets/blocks/Or.png");
        this.load.image("not-block", "assets/blocks/Not.png");
        this.load.image("true-block", "assets/blocks/True.png");
        this.load.image("false-block", "assets/blocks/False.png");
        this.load.image("menu-backplate", "assets/menu/menuBackplate.png");
        this.load.image("play-button", "assets/menu/playButton.png");
        this.load.audio("button-press", "assets/audio/effects/click.mp3");
        this.load.audio("block-break", "assets/audio/effects/cork.mp3");
        this.load.audio(
            "gameplay-music",
            "assets/audio/music/contemplation.mp3"
        );
    }

    create() {
        this.scene.start("MenuScene");
    }
}
