import Phaser from "phaser";

export default class Ticket extends Phaser.GameObjects.Sprite {
    ingredients: number[];
    public length: number;
    public arrivalTime: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        ingredients: number[]
    ) {
        super(scene, x, y, "ticket");
        this.setScale(0.5)
            .setDepth(0)
            .setInteractive({ draggable: true })
            .setName("tricket")
            .on("pointerover", this.orderDetails);
        this.ingredients = ingredients.map((ingrd) => ingrd);
        this.length = this.ingredients.length;
        this.arrivalTime = Phaser.Math.FloatBetween(0, 30);
        scene.add.existing(this);
    }

    orderDetails() {
        console.log(`Order arrived ${this.arrivalTime.toFixed(2)}s ago`);
    }
}
