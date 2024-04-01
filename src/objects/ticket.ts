import Phaser from "phaser";

export default class Ticket extends Phaser.GameObjects.Sprite {
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
        this.ingredients = ingredients.map((ingrd) => ingrd);
        this.depth = 0;
        this.length = this.ingredients.length;
    }
}
