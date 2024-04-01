import Phaser from "phaser";

export default class Ticket extends Phaser.Physics.Arcade.Sprite {
    ingredients: number[];
    public length: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        ingredients: number[]
    ) {
        super(scene, x, y, "ticket");
        this.setScale(0.5);
        this.setInteractive({ draggable: true });
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        this.ingredients = ingredients.map((ingrd) => ingrd);
        this.length = this.ingredients.length;
    }
}
