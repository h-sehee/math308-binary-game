import Phaser from "phaser";

export default class LoadingScene1 extends Phaser.Scene {
    private content: string[];
    private wordDelay: number;
    private lineDelay: number;
    private startX: number;
    private startY: number;
    private currentLine: Phaser.GameObjects.Text;
    private lineIndex: number;
    private lines: string[];

    constructor() {
        super({ key: "LoadingScene1" });
    }

    preload() {
        this.load.image("background", "assets/level01background.png");
        this.load.image("alfredicon", "assets/alfredicon.png");
    }

    create() {
        this.resetScene();
        this.add.rectangle(640, 360, 1280, 720, 0x000);
        this.add.image(1150, 100, "alfredicon").setDisplaySize(130, 130);
        this.displayNextLine();

        this.input.keyboard?.once("keydown-ENTER", () => {
            this.scene.restart();
            this.scene.start("Level01");
        });
    }
    resetScene() {
        this.wordDelay = 25;
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

        this.lines = this.content.join("\n").split("\n"); // Split the content into lines
    }
    displayNextLine() {
        if (this.lineIndex < this.lines.length) {
            const line = this.lines[this.lineIndex++];
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

            // Call the method to start typing text one character at a time
            this.typeText(line);
        }
    }

    typeText(line: string) {
        const characters = line.split("");
        let i = 0;
        this.time.addEvent({
            delay: this.wordDelay,
            repeat: characters.length - 1,
            callback: () => {
                this.currentLine.text += characters[i++];
                if (i === characters.length) {
                    // Once the line is completed, wait a bit before starting the next line
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
