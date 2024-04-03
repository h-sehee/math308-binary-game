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
        });
    }

    create() {
        this.scene.start("TitleScene");
    }
}
