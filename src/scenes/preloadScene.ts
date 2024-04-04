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
        this.load.image("kitchen1", "assets/img/cartoon-kitchen.jpg");
        this.load.image("kitchen2", "assets/img/restaurant_oven.jpg");
        this.load.image("tomato", "assets/img/Tomato.jpg");
        this.load.image("inside", "assets/img/Indoor_Restaurant.jpg");
        this.load.spritesheet("dude", "assets/img/Sprite.png",
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
