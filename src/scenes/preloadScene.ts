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
            key: "play_btn",
            url: "assets/img/play_button.png",
        });
        this.load.image({
            key: "title_bg",
            url: "assets/img/title_bg.png",
        });
    }

    create() {
        this.scene.start("TitleScene");
    }
}
