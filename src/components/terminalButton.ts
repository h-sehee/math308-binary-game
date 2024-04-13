import Phaser from "phaser";

export default class TerminalButton extends Phaser.GameObjects.Sprite {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        text: string,
        eventID: string
    ) {
        super(scene, x, y, texture);
        console.log("button created");
        scene.add.existing(this);
        this.setInteractive();
        this.on("pointerdown", () => {
            this.scene.events.emit(eventID);
        });
    }
}
