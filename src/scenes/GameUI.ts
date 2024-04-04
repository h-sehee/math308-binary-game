import Phaser from "phaser";
import { sceneEvents } from "../events/eventsCenter";

export default class GameUI extends Phaser.Scene {
    private hearts: Phaser.GameObjects.Group;

    constructor() {
        super({ key: "game-ui" });
    }

    create() {
        this.hearts = this.add.group({ classType: Phaser.GameObjects.Image });
        this.hearts.createMultiple({
            key: "heart-full",
            setXY: {
                x: 30,
                y: 30,
                stepX: 16,
            },
            quantity: 3,
        });

        sceneEvents.on(
            "player-health-changed",
            this.handlePlayerHealthChanged,
            this
        );
    }

    private handlePlayerHealthChanged(health: number) {
        this.hearts.children.each((go, idx) => {
            const heart = go as Phaser.GameObjects.Image;
            if (idx < health) {
                heart.setTexture("heart-full");
            } else {
                heart.setTexture("heart-empty");
            }
            return true;
        });
    }
}
