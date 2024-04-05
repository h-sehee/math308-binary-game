import Phaser from "phaser";

export default class LoadingScene1 extends Phaser.Scene {
    private content: string[]; // text to display
    private charDelay: number; // delay between characters
    private lineDelay: number; // delay between lines
    private startX: number; // start X position of the text
    private startY: number; // start Y position of the text
    private currentLine: Phaser.GameObjects.Text; // Text object to display the current line
    private lineIndex: number; // index of the current line

    constructor() {
        super({ key: "LoadingScene1" });
    }

    preload() {
        this.load.image("alfredicon", "assets/alfredicon.png");
    }

    create() {
        this.resetScene(); // helper to reset intial values on load

        //adding assets
        this.add.rectangle(640, 360, 1280, 720, 0x000);
        this.add.image(1150, 100, "alfredicon").setDisplaySize(130, 130);

        //display text
        this.displayNextLine();

        // On enter, transition to Level 1
        this.input.keyboard?.once("keydown-ENTER", () => {
            this.scene.start("Level01");
        });
    }

    resetScene() {
        // helper to reset intial values on load
        this.charDelay = 25;
        this.lineDelay = 100;
        this.startX = 100;
        this.startY = 200;
        this.lineIndex = 0;
        this.content = [
            "Alfred:",
            "Welcome back agent09! Your mission, should you choose to",
            "accept it, involves critical file manipulation. You need to navigate ",
            "to the 'secret_folder' and remove the 'classified_file'. Here are the ",
            "commands at your disposal:",
            " - 'ls' to list the contents of the current directory.",
            " - 'cd <directory>' to change the current directory. Use 'cd ..' to go back.",
            " - 'rm <file>' to remove a file.",
            " - 'man <command>' to display the manual for a specific command.",
            "Press 'Enter' to start the mission. Good luck, agent09!",
        ];
    }

    // helper to display text line by line, calling typeText to animate
    displayNextLine() {
        if (this.lineIndex < this.content.length) {
            const line = this.content[this.lineIndex++];
            // Create a new text object for the current line
            this.currentLine = this.add.text(
                this.startX,
                this.startY + 22 * (this.lineIndex - 1),
                "",
                {
                    fontFamily: "Courier New",
                    fontSize: "24px",
                    color: "#fff",
                }
            );
            // Start typing the line
            this.typeText(line);
        }
    }

    // helper to animate text typing
    typeText(line: string) {
        // split the line into characters
        const characters = line.split("");
        let i = 0;
        // add a delayed event for each character
        this.time.addEvent({
            delay: this.charDelay,
            repeat: characters.length - 1,
            callback: () => {
                this.currentLine.text += characters[i++];
                if (i === characters.length) {
                    // once all characters are added, add a delayed event to display the next line
                    this.time.delayedCall(
                        this.lineDelay,
                        this.displayNextLine,
                        [],
                        this
                    );
                }
            },
            callbackScope: this,
        });
    }
}
