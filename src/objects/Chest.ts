import Phaser from "phaser";

export default class Chest extends Phaser.Physics.Arcade.Sprite {
    item: string;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
        this.anims.play("chest-closed");
    }
}
