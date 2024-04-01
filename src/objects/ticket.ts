import Phaser from "phaser";

export default class Ticket extends Phaser.GameObjects.Sprite {
    public length: number;
    ingredients: number[];
    arrivalTime: number;
    details: Phaser.GameObjects.Text;

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
            .on("pointerover", this.showDetails)
            .on("pointerout", this.hideDetails);
        this.ingredients = ingredients.map((ingrd) => ingrd);
        this.length = this.ingredients.length;
        this.arrivalTime = Phaser.Math.FloatBetween(0, 30);
        this.details = scene.add
            .text(x, y + 100, `Arrived ${this.arrivalTime.toFixed(2)}s ago.`)
            .setAlpha(0)
            .setOrigin(0.5, 1);
        scene.events.on("update", this.update, this);
        scene.add.existing(this);
    }

    showDetails() {
        this.scene.tweens.add({
            targets: [this.details],
            alpha: { from: 0, to: 1 },
            duration: 300,
        });
    }

    hideDetails() {
        this.details.setAlpha(0);
    }

    update() {
        this.details.setPosition(this.x, this.y + 100);
    }
}
