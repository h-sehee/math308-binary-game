import Phaser from "phaser";
import { CONFIG } from "../config";
import Ticket from "../objects/ticket";
import TicketHolder from "../objects/ticketHolder";
import CurrentOrder from "../objects/currentOrder";
import ShiftGUI from "./shiftGUI";

// FIRST COME FIRST SERVED
export default class Shift1 extends Phaser.Scene {
    tickets: Ticket[];
    ticketHolders: TicketHolder[] = [];
    currentOrder: CurrentOrder;
    gui: ShiftGUI;

    constructor() {
        super({ key: "Shift1" });
    }

    init() {
        this.scene.launch("ShiftGUI", { shift: this.scene.key });
        this.gui = this.scene.get("ShiftGUI") as ShiftGUI;
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
                new TicketHolder(this, 80 + 60 * i * 3, 75, 150, 320)
            );
        }

        this.ticketHolders.map((holder) =>
            !holder.ticket
                ? (holder.ticket = new Ticket(this, holder.x, 134, [1, 2]))
                : null
        );

        this.currentOrder = new CurrentOrder(this, 900, 110, 240, 240);
        this.add.rectangle(
            this.currentOrder.x,
            this.currentOrder.y,
            this.currentOrder.width,
            this.currentOrder.height,
            0xfff000,
            80
        );
    }

    update() {}
}
