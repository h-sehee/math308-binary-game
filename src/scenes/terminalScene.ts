import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import { HolyGrail } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { TextBox } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { Rectangle } from "phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext.js";

export default class TerminalScene extends Phaser.Scene {
    private userInputs: string[] = [];
    private terminalText: string = "";
    private preCodedPromts: string[] = [
        "Welcome to the terminal",
        "Type 'help' for a list of commands",
        "Type 'exit' to leave the terminal",
    ];
    rexUI: RexUIPlugin; // Declare scene property 'rexUI' as RexUIPlugin type

    private addLineToTerminalText(text: string) {
        this.terminalText += text + "\n";
    }
    constructor() {
        super({ key: "TerminalScene" });
    }

    create() {
        const DEFAULT_WIDTH = 1280;
        const DEFAULT_HEIGHT = 720;
        const x = DEFAULT_WIDTH / 2;
        const y = DEFAULT_HEIGHT / 2;
        const backgroundWidth = DEFAULT_WIDTH - 100;
        const backgroundHeight = DEFAULT_HEIGHT - 100;
        const paddingX = 50;
        const paddingY = 10;
        const textX = paddingX;
        const textY = 60;
        var textBox = new TextBox(this, {
            x: x,
            y: y,
            width: backgroundWidth - paddingX,
            height: backgroundHeight - paddingY,
            layoutMode: 0,
            background: this.rexUI.add.roundRectangle(
                x,
                y,
                backgroundWidth,
                backgroundHeight,
                10,
                0x6666ff
            ),
            text: this.add.text(textX, textY, "Content", {
                fontSize: "32px",
                color: "#000",
            }),
        });
        this.add.existing(textBox);
    }

    update() {}
}
