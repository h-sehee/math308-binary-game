import Phaser from "phaser";
import { CONFIG } from "../config";
import Ticket from "../objects/ticket";

export default class MainScene extends Phaser.Scene {
    tickets: Ticket[];

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

        this.tickets = [
            new Ticket(this, 0, 0, [1, 2]),
            new Ticket(this, 0, 0, [1, 2]),
            new Ticket(this, 0, 0, [1, 2]),
        ];

        this.input.on(
            "dragstart",
            (
                _pointer: Phaser.Input.Pointer,
                sprite: Phaser.Physics.Arcade.Sprite
            ) => {
                sprite.setScale(0.6);
            }
        );

        this.input.on(
            "drag",
            (
                _pointer: Phaser.Input.Pointer,
                sprite: Phaser.Physics.Arcade.Sprite,
                dragX: number,
                dragY: number
            ) => {
                sprite.x = dragX;
                sprite.y = dragY;
            }
        );

        this.input.on(
            "dragend",
            (
                _pointer: Phaser.Input.Pointer,
                sprite: Phaser.Physics.Arcade.Sprite
            ) => {
                sprite.setScale(0.5);
            }
        );
    }

    update() {}
}
