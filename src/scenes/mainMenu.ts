import Phaser from "phaser";
import { CONFIG } from "../config";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
    }

    create() {
        const version = CONFIG.version;
        this.add
            .text(this.cameras.main.width - 15, 15, version, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);

        this.add.text(this.cameras.main.centerX, 200, "SCHEDULSINE", {
            color: "#54d6d2",
        });
    }
}
