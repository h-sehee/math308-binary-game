import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: "TitleScene" });
    }

    create() {
        //Logo Image
        this.add.image(this.cameras.main.displayWidth * (1/2), this.cameras.main.displayHeight * (1/4), 'title_logo');
    }

    
}