import Phaser from "phaser";
import Ticket from "./ticket";

export default class TicketHolder extends Phaser.GameObjects.Sprite {
    ticket: Ticket;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "ticket-holder");
        this.setInteractive({ dropZone: true });
        this.setScale(4);
        this.depth = 1;
        scene.add.existing(this);
    }
}
