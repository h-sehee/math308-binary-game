import Phaser from "phaser";

export default class informationScene extends Phaser.Scene {
    constructor() {
        super({ key: "informationScene" });
    }

    create(): void {
        //Screen for topic information
        //Add music
        const music = this.sound.add("backgroundMusic");
        music.play({ loop: true });
        //let graphics = this.add.graphics({ fillStyle: { color: 0xa0522d } });
        //Add text information
        this.add.text(100, 260, "What is I/O Scheduling?", {
            font: "50px Arial",
            color: "#000000",
        });

        const paragraph =
            "I/O, input-output, scheduling ensures that time spent on";
        ("operations is used efficiently and is minimized. This");
        ("assures for increased processing speed, better system");
        ("responsiveness, and better throughput.");

        const paragraph2 =
            "Algorithms help to manage challenges such as different";
        ("size priorities, read and write operations, and");
        ("characteristics of the storage device like time taken");
        ("for operations.");

        this.add.text(100, 200, paragraph, {
            font: "18px Arial",
            color: "#000000",
            wordWrap: { width: 600 },
        });

        this.add.text(100, 200, paragraph2, {
            font: "18px Arial",
            color: "#000000",
            wordWrap: { width: 600 },
        });

        let nextButton = this.add
            .text(100, 200, "Next", { font: "20px Arial", color: "#FFD700" })
            .setInteractive();

        //Button clck event
        nextButton.on("pointerdown", () => {
            // switch to next scene
            this.scene.start("informationScene2");
        });
    }
}