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
    private terminalInputArr: string[] = []; //this is the array of commands the user has input

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
        //TODO @JOSH - Have Offset Scale with font size

        const BUTTON_TXT_OFFSET_X = 100;
        const BUTTON_TXT_OFFSET_Y = 14;
        const BUTTON_1_X = 200;
        const BUTTON_1_Y = 100;
        const button = this.add.sprite(BUTTON_1_X, BUTTON_1_Y, "button");
        this.add.text(
            BUTTON_1_X - BUTTON_TXT_OFFSET_X,
            BUTTON_1_Y - BUTTON_TXT_OFFSET_Y,
            "git add red",
            {
                fontSize: "32px",
                color: "#FFF",
            }
        );

        button.setInteractive();
        button.on("pointerdown", () => this.terminalInputArr.length < 3 ? this.terminalInputArr.push("git_add_red") : this.handleCorrect(this.terminalInputArr));
        //button.on("pointerdown", () => this.events.emit("git_add_red_clicked"));

        const BUTTON_2_TXT_OFFSET_X = 100;
        const BUTTON_2_TXT_OFFSET_Y = 14;
        const BUTTON_2_X = 500;
        const BUTTON_2_Y = 100;
        const button2 = this.add.sprite(BUTTON_2_X, BUTTON_2_Y, "button");
        this.add.text(
            BUTTON_2_X - BUTTON_2_TXT_OFFSET_X,
            BUTTON_2_Y - BUTTON_2_TXT_OFFSET_Y,
            "git add blue",
            {
                fontSize: "30px",
                color: "#FFF",
            }
        );
        button2.setInteractive();
        button2.on("pointerdown", () =>
            this.terminalInputArr.length < 3
                ? this.terminalInputArr.push("git_add_blue")
                : this.handleCorrect(this.terminalInputArr)
        );
        //button2.on("pointerdown", () => this.events.emit("git_add_blue_clicked"));

        const BUTTON_3_TXT_OFFSET_X = 98;
        const BUTTON_3_TXT_OFFSET_Y = 14;
        const BUTTON_3_X = 800;
        const BUTTON_3_Y = 100;
        const button3 = this.add.sprite(BUTTON_3_X, BUTTON_3_Y, "button");
        this.add.text(
            BUTTON_3_X - BUTTON_3_TXT_OFFSET_X,
            BUTTON_3_Y - BUTTON_3_TXT_OFFSET_Y,
            "git commit -m 'Add\n     New Platform'",
            {
                fontSize: "20px",
                color: "#FFF",
            }
        );
        button3.setInteractive();
        button3.on("pointerdown", () =>
            this.terminalInputArr.length < 3
                ? this.terminalInputArr.push("git_commit")
                : this.handleCorrect(this.terminalInputArr)
        );
        //button3.on("pointerdown", () => this.events.emit("git_commit_clicked"));

        const BUTTON_4_TXT_OFFSET_X = 98;
        const BUTTON_4_TXT_OFFSET_Y = 14;
        const BUTTON_4_X = 1100;
        const BUTTON_4_Y = 100;
        const button4 = this.add.sprite(BUTTON_4_X, BUTTON_4_Y, "button");
        this.add.text(
            BUTTON_4_X - BUTTON_4_TXT_OFFSET_X,
            BUTTON_4_Y - BUTTON_4_TXT_OFFSET_Y,
            "git push",
            {
                fontSize: "32px",
                color: "#FFF",
            }
        );
        button4.setInteractive();
        button4.on("pointerdown", () =>
            this.terminalInputArr.length < 3
                ? this.terminalInputArr.push("git_push")
                : this.handleCorrect(this.terminalInputArr)
        );
        //button4.on("pointerdown", () => this.events.emit("git_push_clicked"));
        console.log(this.terminalInputArr);
    }

    private handleCorrect(terminalInput: string[]): boolean {
        this.events.emit("terminal_input", terminalInput);
        return true;
    }

    update() {}
}
