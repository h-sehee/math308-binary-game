import Phaser from "phaser";

export default class LoadingScene1 extends Phaser.Scene {
    private content: string[];
    private line: string[];
    private wordIndex: number;
    private lineIndex: number;
    private wordDelay: number;
    private lineDelay: number;
    private currentLineLength: number;

    constructor() {
        super({ key: "LoadingScene1" });
    }

    preload() {
        // Assuming the assets are located in a 'assets/' directory
        this.load.image("background", "assets/background.png"); // Replace with the actual background image file
        this.load.image("alfredicon", "assets/alfredicon.png"); // Replace with Alfred's sprite image file
    }

    create() {
        // Initialize properties
        this.line = [];
        this.wordIndex = 0;
        this.lineIndex = 0;
        this.wordDelay = 120;
        this.lineDelay = 400;
        this.currentLineLength = 0;
        // Display the background
        this.add.rectangle(640, 360, 1280, 720, 0x000); // If using an image: this.add.image(640, 360, "background");

        // Display Alfred's icon in the specified position
        this.add.image(1150, 100, "alfredicon").setDisplaySize(130, 130);

        this.content = [
            "Alfred: Welcome back agent09!\n\n" +
                "Your mission, should you choose to accept it, involves critical file manipulation. " +
                "You need to navigate to the 'secret_folder' and remove the 'classified_file'.\n\n" +
                "Here are the commands at your disposal:\n" +
                "- 'ls' to list the contents of the current directory.\n" +
                "- 'cd <directory>' to change the current directory. Use 'cd ..' to go back.\n" +
                "- 'rm <file>' to remove a file.\n" +
                "- 'man <command>' to display the manual for a specific command.\n\n" +
                "Press 'Enter' to start your mission.",
        ];

        this.nextLine();

        // Listen for 'Enter' key to start the mission
        this.input.keyboard?.once("keydown-ENTER", () => {
            this.scene.start("Level01"); // Start Level01
        });
    }

    nextLine() {
        if (this.lineIndex === this.content.length) {
            // All lines are done
            return;
        }
        this.currentLineLength = this.line.length;
        // Split the current line into words
        this.line = this.content[this.lineIndex].split(" ");

        // Reset the word index and call the method to display the next word
        this.wordIndex = 0;
        this.time.delayedCall(10, this.nextWord, [], this);
        return;
    }

    nextWord() {
        if (this.wordIndex >= this.line.length) {
            // Prepare for the next line
            this.lineIndex++;
            this.time.delayedCall(this.lineDelay, this.nextLine, [], this);
            return;
        }
        // Create the text object for the word
        const wordText = this.add.text(
            100 + this.currentLineLength,
            50 + this.lineIndex * 22,
            this.line[this.wordIndex] + " ",
            {
                fontFamily: "Arial",
                fontSize: "24px",
                color: "#fff",
            }
        );
        // Update the current line length
        this.currentLineLength += wordText.width;

        // Prepare the next word
        this.wordIndex++;
        this.time.delayedCall(this.wordDelay, this.nextWord, [], this);
    }
}
