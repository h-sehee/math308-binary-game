import Phaser from "phaser";

export default class GameUI extends Phaser.Scene {
    constructor() {
        super({ key: "game-ui" });
    }

    create() {
        const hearts = this.add.group({ classType: Phaser.GameObjects.Image });
        hearts.createMultiple({
            key: "heart-full",
            setXY: {
                x: 30,
                y: 30,
                stepX: 16,
            },
            quantity: 3,
        });
    }
}
