import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super({ key: "TitleScene" });
    }

    create() {
        //Logo Image
        this.add.image(this.cameras.main.displayWidth * (1/2), this.cameras.main.displayHeight * (2/5), 'title_logo');

        //Play Button
        const play_btn = this.add.image(this.cameras.main.width * (1/2), 610, 'play_btn');
        play_btn
            .setInteractive()
            //.on('pointerdown', () => this.scene.start("Game_1"))
            .on('pointerover', () => play_btn.setScale(1.1))
            .on('pointerout', () => play_btn.setScale(1));
    }

    
}