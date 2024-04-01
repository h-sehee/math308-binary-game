import Phaser from "phaser";
import Ticket from "./ticket";

export default class TicketHolder extends Phaser.GameObjects.Zone {
    public clip: Phaser.GameObjects.Sprite;
    public ticket: Ticket | null;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        ticket: Ticket | null
    ) {
        super(scene, x, y, width, height);
        this.setDropZone();
        scene.add.existing(this);
        this.setName("holder");
        this.ticket = ticket;
        this.clip = scene.add.sprite(x, y, "ticket-holder");
        this.clip.setScale(4).setDepth(1);
        scene.add.rectangle(x, y, this.width, this.height, 0xfff, 80);
    }
}
