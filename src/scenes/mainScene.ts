import Phaser from "phaser";
import { CONFIG } from "../config";
import Ticket from "../objects/ticket";
import TicketHolder from "../objects/ticketHolder";
import CurrentOrder from "../objects/currentOrder";

export default class MainScene extends Phaser.Scene {
    tickets: Ticket[];
    ticketHolders: TicketHolder[] = [];
    currentOrder: CurrentOrder;

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

        for (let i = 0; i < 3; i++) {
            this.ticketHolders.push(
                new TicketHolder(this, 80 + 60 * i * 3, 75, 150, 320, null)
            );
        }

        this.ticketHolders.map((holder) =>
            !holder.ticket
                ? (holder.ticket = new Ticket(this, holder.x, 134, [1, 2]))
                : null
        );

        this.currentOrder = new CurrentOrder(this, 900, 110, 240, 240, null);
        this.add.rectangle(
            this.currentOrder.x,
            this.currentOrder.y,
            this.currentOrder.width,
            this.currentOrder.height,
            0xfff000,
            80
        );

        this.input.on(
            "dragstart",
            (_pointer: Phaser.Input.Pointer, ticket: Ticket) => {
                ticket.setScale(0.6);
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
        this.input.on(
            "dragenter",
            (
                _pointer: Phaser.Input.Pointer,
                ticket: Ticket,
                target: TicketHolder | CurrentOrder
            ) => {
                console.log(`Entering ${target.name}`);
                ticket.setScale(0.7);
            }
        );
        this.input.on(
            "dragleave",
            (
                _pointer: Phaser.Input.Pointer,
                ticket: Ticket,
                target: TicketHolder | CurrentOrder
            ) => {
                console.log(`Leaving ${target.name}`);
                ticket.setScale(0.6);
            }
        );
        this.input.on(
            "drop",
            (
                _pointer: Phaser.Input.Pointer,
                ticket: Ticket,
                target: TicketHolder | CurrentOrder
            ) => {
                if (target.name === "holder") {
                    target.ticket = ticket;
                    ticket.setPosition(target.x, target.y + 60);
                } else if (target.name === "current") {
                    ticket.setPosition(target.x, target.y);
                }
            }
        );
    }

    update() {}
}
