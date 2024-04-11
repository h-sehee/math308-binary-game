import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import { TextBox } from "phaser3-rex-plugins/templates/ui/ui-components.js";

export default class TerminalScene extends Phaser.Scene {
    private userInputs: string[] = [];
    private terminalText: string = "";
    private preCodedPromts: string[] = [
        "% Welcome to the terminal",
        "% Type 'help' for a list of commands",
        "% Type 'exit' to leave the terminal",
    ];
    rexUI: RexUIPlugin; // Declare scene property 'rexUI' as RexUIPlugin type

    private addLineToTerminalText(textBox: TextBox, text: string) {
        textBox.text += "\n" + text;
    }
    constructor() {
        super({ key: "TerminalScene" });
    }

    create() {
        // const DEFAULT_WIDTH = 1280;
        // const DEFAULT_HEIGHT = 720;
        // const backgroundColor = 0x141414;
        // const x = DEFAULT_WIDTH / 2;
        // const y = DEFAULT_HEIGHT / 2;
        // const backgroundWidth = DEFAULT_WIDTH - 100;
        // const backgroundHeight = DEFAULT_HEIGHT - 100;
        // const paddingX = 50;
        // const paddingY = 10;
        // const textX = 70;
        // const textY = 80;
        // var textBox = new TextBox(this, {
        //     x: x,
        //     y: y,
        //     width: backgroundWidth - paddingX,
        //     height: backgroundHeight - paddingY,
        //     layoutMode: 0,
        //     background: this.rexUI.add.roundRectangle(
        //         x,
        //         y,
        //         backgroundWidth,
        //         backgroundHeight,
        //         10,
        //         backgroundColor
        //     ),
        //     text: this.add.text(textX, textY, this.preCodedPromts[0], {
        //         fontFamily: "Arial",
        //         fontSize: "32px",
        //         color: "#FFF",
        //     }),
        // });

        // this.add.existing(textBox);
        // this.addLineToTerminalText(textBox, this.preCodedPromts[1]);
        // this.addLineToTerminalText(textBox, "%");

        // const text = this.add.text(120, 120 + 40, "Click To Edit", {
        //     fixedWidth: 150,
        //     fixedHeight: 36,
        // });
        // text.setOrigin(0, 0);

        // text.setInteractive().on("pointerdown", () => {
        //     this.rexUI.edit(text);
        // });
        // const editor = this.rexUI.edit(text);
        // const elem = editor.inputText.node as HTMLInputElement;
        // elem.style.position = "absolute";
        // elem.style.left = "200px";
        // elem.style.top = "200px";

        //TODO @JOSH - Add a seperate file or function to create buttons so not duplicate code
        const BUTTON_TXT_OFFSET_X = 100;
        const BUTTON_TXT_OFFSET_Y = 14;
        const BUTTON_1_X = 200;
        const BUTTON_1_Y = 100;
        const button = this.add.sprite(BUTTON_1_X, BUTTON_1_Y, "button");
        this.add.text(
            BUTTON_1_X - BUTTON_TXT_OFFSET_X,
            BUTTON_1_Y - BUTTON_TXT_OFFSET_Y,
            "git add .",
            {
                fontSize: "32px",
                color: "#FFF",
            }
        );

        button.setInteractive();
        button.on("pointerdown", () => this.events.emit("git_add_red_clicked"));
    }

    update() {}
}
