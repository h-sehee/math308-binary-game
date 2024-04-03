import Phaser from "phaser";

export default class LoadoutSceneTextboxTest extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    constructor() {
        super({ key: "LoadoutSceneTextboxTest" });
    }

    create() {
        // Create Class Textboxes
        this.createEditableText(
            300,
            300,
            "type here",
            "#ff0000",
            "000000",
            (newValue) => {
                console.log("New text value:", newValue);
            }
        );

        // Create Phaser DOMElement from input
        this.textbox = new Phaser.GameObjects.DOMElement(
            this,
            100,
            100,
            this.textInput
        );

        // Make the textbox clickable
        this.textbox.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, 200, 30),
            Phaser.Geom.Rectangle.Contains
        );

        // Add the textbox to the scene
        this.add.existing(this.textbox);

        // Handle pointerdown event
        this.textbox.on("pointerdown", () => {
            this.textInput.focus();
        });
    }

    createEditableText(
        x: number,
        y: number,
        initialText: string, // Initial text to display; can be an empty string
        textColor: string,
        backdrop: string,
        onChange: (newValue: string) => void // Callback function when text changes
    ): void {
        // Predefined style for all clickable text instances, adjusted for editable text
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: "100px",
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
            padding: { left: 5, right: 5, top: 5, bottom: 5 }, // Optional: Adjust padding if needed
        };

        // Create text object as before but with initial text
        const textObject = this.add.text(x, y, initialText, style);

        // Create an invisible DOM input over the text object for editing
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = initialText; // Set initial value to initialText
        inputElement.style.position = "absolute";
        inputElement.style.opacity = "0"; // Make the input invisible
        inputElement.style.fontSize = "100px"; // Match font size with Phaser text
        inputElement.style.color = textColor; // Match text color
        inputElement.style.background = "transparent"; // Ensure input background is transparent
        inputElement.style.border = "none"; // No border
        inputElement.style.outline = "none"; // No outline
        inputElement.style.width = `${textObject.width}px`; // Match width with Phaser text object
        inputElement.style.height = `${textObject.height}px`; // Match height with Phaser text object
        // Position the input element
        const canvasBounds = this.sys.game.canvas.getBoundingClientRect();
        inputElement.style.left = `${canvasBounds.left + x}px`;
        inputElement.style.top = `${canvasBounds.top + y}px`;

        document.body.appendChild(inputElement); // Add input element to the document body

        // Event listener to update Phaser text object whenever the input changes
        inputElement.oninput = (event) => {
            const target = event.target as HTMLInputElement;
            textObject.setText(target.value);
            onChange(target.value); // Callback with the new value
        };

        // Optional: Clean up the input element when it's no longer needed
        textObject.on("destroy", () => {
            document.body.removeChild(inputElement);
        });
    }

    update() {}
}
