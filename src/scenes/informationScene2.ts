import Phaser from "phaser";

export default class informationScene2 extends Phaser.Scene {
    constructor() {
        super({ key: "informationScene2" });
    }

    create() {
        //Add music
        const music = this.sound.add("backgroundMusic");
        music.play({ loop: true });
        //Screen for topic information
        //let graphics = this.add.graphics({ fillStyle: { color: 0xa0522d } });
        //Add text information
        this.add.text(100, 260, "Algorithms", {
            font: "50px Arial",
            color: "#ffffff",
        });

        const paragraph3 = "First-Come, First-Served (FCFS)";
        (" - Processes I/O requests in order they arrive.");
        ("Shortest Seek Time First (SSTF)");
        (" - Chooses request closest to current head position.");
        ("SCAN (Elevator)");
        (" - Starts from one end of disk and moves toward the other");
        (" - Services Requests along the way, then reverses direction");

        this.add.text(100, 200, paragraph3, {
            font: "22px Arial",
            color: "#ffffff",
            wordWrap: { width: 600 },
        });

        let nextButton2 = this.add
            .text(100, 200, "Next", { font: "20px Arial", color: "#0f0" })
            .setInteractive();

        //Button clck event
        nextButton2.on("pointerdown", () => {
            // switch to next scene
            this.scene.start("Game_1");
        });
    }
}
