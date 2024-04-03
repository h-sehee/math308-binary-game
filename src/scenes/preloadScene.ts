import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        //Logo Image
        this.load.svg({
            key: 'title_logo',
            url: 'assets/img/schedulsine_logo.svg',
            svgConfig: {
                scale: 1.5
            }
        })
        this.load.spritesheet("dude", "assets/img/dude.png",
        {
            frameWidth: 32,
            frameHeight: 48,
        });

        //Play Button
        this.load.image({
            key: 'play_btn',
            url: 'assets/img/play_button.png'
        });
    }

    create() {
        this.scene.start("TitleScene");
    }
}
