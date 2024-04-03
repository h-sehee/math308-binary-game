import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: "TitleScene" });
    }

    create() {
        const logo = this.add.image(this.cameras.main.displayWidth * (1/2), this.cameras.main.displayHeight * (1/4), 'title_logo');
        logo.

        //Supposed to fade in, probably will delete though.
        this.tweens.add({
            targets: [logo],
            alpha: 1,
            duration: 2000,
            ease: "Linear",
        });
    }

    
}