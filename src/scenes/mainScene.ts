import Phaser from "phaser";
import { CONFIG } from "../config";
import Ticket from "../objects/ticket";
import TicketHolder from "../objects/ticketHolder";

export default class MainScene extends Phaser.Scene {
    tickets: Ticket[];
    ticketHolders: TicketHolder[];

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        const version = CONFIG.version;
        this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "kitchen"
        );
        this.add
            .text(this.cameras.main.width - 15, 15, version, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);

        this.ticketHolders = [
            new TicketHolder(this, 60, 75),
            new TicketHolder(this, 250, 75),
            new TicketHolder(this, 440, 75),
        ];

        this.tickets = [
            new Ticket(this, 60, 134, [1, 2]),
            new Ticket(this, 250, 134, [1, 2]),
            new Ticket(this, 440, 134, [1, 2]),
        ];

        this.input.on(
            "dragstart",
            (_pointer: Phaser.Input.Pointer, ticket: Ticket) => {
                ticket.setScale(0.6);
                console.log("" + ticket.x + " " + ticket.y);
                ticket.depth = 2;
            }
        );
        this.input.on(
            "drag",
            (
                _pointer: Phaser.Input.Pointer,
                ticket: Ticket,
                dragX: number,
                dragY: number
            ) => {
                ticket.x = dragX;
                ticket.y = dragY;
            }
        );
        this.input.on(
            "dragend",
            (_pointer: Phaser.Input.Pointer, ticket: Ticket) => {
                ticket.setScale(0.5);
                ticket.depth = 0;
            }
        );
    }

    update() {}
}
