import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //Logo, Play Button, and Background Assets
        this.load.image({
            key: "title_logo",
            url: "assets/img/schedulsine_logo.png",
        });
        this.load.image({
            key: "play_bttn",
            url: "assets/img/play_bttn.png",
        });
        this.load.image({
            key: "title_bg",
            url: "assets/img/title_bg.png",
        });

        //Sounds
        this.load.audio("backgroundMusic", "assets/img/overcookedSound.mp3");

        this.load.image("kitchen1", "assets/img/cartoon-kitchen.jpg");
        this.load.image("kitchen2", "assets/img/restaurant_oven.jpg");
        this.load.image("tomato", "assets/img/Tomato.jpg");
        this.load.spritesheet("dude", "assets/img/Sprite.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.scene.start("TitleScene");
    }
}
