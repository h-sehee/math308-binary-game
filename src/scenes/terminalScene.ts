import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import { TextBox } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import TerminalButton from "../components/terminalButton";
import { ButtonAndListensers } from "../components/buttonAndListeners";
import LevelClass from "../Classes/LevelClass";

export default class TerminalScene extends LevelClass {
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
        //TODO @JOSH - Add a seperate file or function to create buttons so not duplicate code
        //TODO @JOSH - Have Offset Scale with font size

        //Create buttons and listenters

        new ButtonAndListensers(
            this,
            200,
            100,
            "button",
            [
                "git add red",
                "git add blue",
                "git commit -m 'Add New Platform'",
                "git push",
            ],
            ["git add blue", "git commit -m 'Add New Platform'", "git push"],
            this.handleCorrect
        );
    }

    private handleCorrect(scene: LevelClass, input: string[]): boolean {
        console.log(input);
        if (
            JSON.stringify(input) ===
            JSON.stringify([
                "TerminalScene_git add blue",
                "TerminalScene_git commit -m 'Add New Platform'",
                "TerminalScene_git push",
            ])
        ) {
            scene.events.emit("terminal_input");
        }
        return true;
    }

    update() {}
}
