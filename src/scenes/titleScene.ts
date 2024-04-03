import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: "TitleScene" });
    }

    create() {
        const logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title_logo');

        this.tweens.add({
            targets: [logo],
            alpha: 1,
            duration: 2000,
            ease: "Linear",
        });
    }

    
}