import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import { TextBox } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import TerminalButton from "../components/terminalButton";
import { ButtonAndListensers } from "../components/buttonAndListeners";

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
        //TODO @JOSH - Add a seperate file or function to create buttons so not duplicate code
        //TODO @JOSH - Have Offset Scale with font size

        //Create buttons and listenters

        new ButtonAndListensers(this, 200, 100, "button", [
            "git add red",
            "git add blue",
            "git commit -m 'Add New Platform'",
            "git push",
        ]);

        // const BUTTON_1_X = 200;
        // const BUTTON_1_Y = 100;
        // const button = new TerminalButton(
        //     this,
        //     BUTTON_1_X,
        //     BUTTON_1_Y,
        //     "button",
        //     "git add red",
        //     "Lvl_1_git_add_red_clicked"
        // );
        // button.on("Lvl_1_git_add_red_clicked", () => {
        //     this.terminalInputArr.push("git_add_red");
        //     this.handleCorrect();
        // });

        // const BUTTON_2_X = 500;
        // const BUTTON_2_Y = 100;
        // new TerminalButton(
        //     this,
        //     BUTTON_2_X,
        //     BUTTON_2_Y,
        //     "button",
        //     "git add blue",
        //     "Lvl_1_git_add_blue_clicked"
        // );
        // this.events.on("Lvl_1_git_add_blue_clicked", () => {
        //     this.terminalInputArr.push("git_add_blue");
        //     this.handleCorrect();
        // });

        // const BUTTON_3_X = 800;
        // const BUTTON_3_Y = 100;
        // new TerminalButton(
        //     this,
        //     BUTTON_3_X,
        //     BUTTON_3_Y,
        //     "button",
        //     "git commit -m 'Add New Platform'",
        //     "Lvl_1_git_commit_clicked"
        // );
        // this.events.on("Lvl_1_git_commit_clicked", () => {
        //     this.terminalInputArr.push("git_commit");
        //     this.handleCorrect();
        // });

        // const BUTTON_4_X = 1100;
        // const BUTTON_4_Y = 100;
        // new TerminalButton(
        //     this,
        //     BUTTON_4_X,
        //     BUTTON_4_Y,
        //     "button",
        //     "git push",
        //     "Lvl_1_git_push_clicked"
        // );
        // this.events.on("Lvl_1_git_push_clicked", () => {
        //     this.terminalInputArr.push("git_push");
        //     this.handleCorrect();
        // });
    }

    private handleCorrect(): boolean {
        console.log(this.terminalInputArr);
        if (
            JSON.stringify(this.terminalInputArr) ===
            JSON.stringify(["git_add_blue", "git_commit", "git_push"])
        ) {
            this.events.emit("terminal_input");
        }
        return true;
    }

    update() {}
}
