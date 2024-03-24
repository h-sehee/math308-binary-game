import Phaser from "phaser";

export default class TextInputScene extends Phaser.Scene {
    private inputText: Phaser.GameObjects.Text;

    private inputField: HTMLInputElement;

    constructor() {
        super({ key: "Scene1" });
    }

    preload() {}

    create() {
        // Add a background
        this.add.rectangle(640, 360, 1280, 720, 0x050);
        this.add.image(100, 200, "alfred");
        this.add.image(100, 700, "spy");

        // Add text input field
        this.inputField = document.createElement("input");
        this.inputField.type = "text";
        this.inputField.style.position = "absolute";
        this.inputField.style.width = "600px";
        this.inputField.style.height = "40px";
        this.inputField.style.fontSize = "20px";
        this.inputField.style.top = "80%";
        this.inputField.style.left = "50%";
        this.inputField.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(this.inputField);

        // Add enter button
        const enterButton = this.add
            .text(1000, 570, "Enter", { fontSize: "24px", color: "#fff" })
            .setInteractive();

        enterButton.on("pointerdown", () => {
            const newText = this.inputField.value;
            if (newText.trim() !== "") {
                this.inputText.setText(this.inputText.text + newText + "\n");
                this.inputField.value = ""; // Empty the input field
            }
        });

        // Add text object to display input text
        this.inputText = this.add.text(300, 100, "", {
            fontSize: "32px",
            color: "#fff",
        });
    }

    update() {}
}
