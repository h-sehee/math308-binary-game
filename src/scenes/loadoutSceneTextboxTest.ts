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
            ":TYPE",
            "#ff0000",
            "000000",
            "80px",
            (newValue) => {
                console.log("New text value:", newValue);
            }
        );
        this.createEditableText(
            600,
            600,
            "ATTRIBUTE",
            "#ff0000",
            "000000",
            "30px",
            (newValue) => {
                console.log("New text value:", newValue);
            }
        );

        this.createEditableText(
            2000,
            300,
            "CLASS",
            "#ff0000",
            "000000",
            "100px",
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

    /*createEditableText(
        x: number,
        y: number,
        initialText: string, // Initial text to display; can be an empty string
        textColor: string,
        backdrop: string,
        textSize: string,
        onChange: (newValue: string) => void // Callback function when text changes
    ): void {
        // Predefined style for all clickable text instances, adjusted for editable text
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: textSize,
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
            padding: { left: 5, right: 5, top: 5, bottom: 5 }, // Optional: Adjust padding if needed
        };

        // Create text object as before but with initial text
        const textObject = this.add
            .text(x, y, initialText, style)
            .setInteractive();

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
        inputElement.style.width = `auto`; // Initially auto width
        inputElement.style.maxWidth = "200px"; // Max width to prevent screen shifting; adjust as needed
        document.body.appendChild(inputElement); // Add input element to the document body

        // Positioning logic to prevent screen shift
        const adjustInputElement = () => {
            const canvasBounds = this.sys.game.canvas.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            let calculatedLeft = canvasBounds.left + x;
            const inputWidth = Math.min(
                textObject.width,
                parseInt(inputElement.style.maxWidth, 10)
            );

            if (calculatedLeft + inputWidth > viewportWidth) {
                // Adjust left position if input extends beyond the viewport
                calculatedLeft = Math.max(0, viewportWidth - inputWidth - 20); // 20px padding
            }

            inputElement.style.left = `${calculatedLeft}px`;
            inputElement.style.top = `${canvasBounds.top + y}px`;
            inputElement.style.height = `${textObject.height}px`; // Match height with Phaser text object
        };
        adjustInputElement(); // Adjust input element upon creation

        // Event listener to update Phaser text object whenever the input changes
        inputElement.oninput = (event) => {
            const target = event.target as HTMLInputElement;
            textObject.setText(target.value);
            onChange(target.value); // Callback with the new value
        };

        // Focus the input element when the Phaser text object is clicked
        textObject.on("pointerdown", () => {
            inputElement.focus();
        });

        // Adjust input element on window resize
        window.addEventListener("resize", adjustInputElement);

        // Optional: Clean up the input element and event listener when it's no longer needed
        textObject.on("destroy", () => {
            document.body.removeChild(inputElement);
            window.removeEventListener("resize", adjustInputElement);
        });
    }*/

    createEditableText(
        x: number,
        y: number,
        initialText: string,
        textColor: string,
        backdrop: string,
        textSize: string,
        onChange: (newValue: string) => void
    ): void {
        // Styling for the Phaser text object
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: textSize,
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
            padding: { left: 5, right: 5, top: 5, bottom: 5 },
        };

        // Create Phaser text object with initial text
        const textObject = this.add
            .text(x, y, initialText, style)
            .setInteractive();

        // Create an invisible HTML input element for editing
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.placeholder = initialText;
        inputElement.style.position = "absolute";
        inputElement.style.opacity = "0"; // Invisible but should still be interactive
        inputElement.style.fontSize = textSize;
        inputElement.style.color = textColor;
        inputElement.style.background = "transparent";
        inputElement.style.border = "none";
        inputElement.style.outline = "none";
        document.body.appendChild(inputElement);

        // Adjust the input element's position to prevent screen shifting
        const adjustInputElement = () => {
            const canvasBounds = this.sys.game.canvas.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            // Calculate input's left position and ensure it doesn't go off-screen
            let calculatedLeft = canvasBounds.left + x;
            const inputWidth =
                parseInt(inputElement.style.width, 10) || textObject.width;

            if (calculatedLeft + inputWidth > viewportWidth) {
                // If the input goes off-screen, adjust its position
                calculatedLeft -=
                    calculatedLeft + inputWidth + 20 - viewportWidth; // 20px padding for safety
            }

            inputElement.style.left = `${calculatedLeft}px`;
            inputElement.style.top = `${canvasBounds.top + y}px`;
            inputElement.style.height = `${textObject.displayHeight}px`; // Adjust to match Phaser text
            inputElement.style.width = "200px"; // Set width to ensure it's clickable and within bounds
        };
        adjustInputElement(); // Initial adjustment

        // Event listener for input changes
        inputElement.oninput = (event) => {
            const target = event.target as HTMLInputElement;
            textObject.setText(target.value);
            onChange(target.value);
            if (target.value == "") {
                textObject.setText(initialText);
            }
        };

        // Ensure Phaser text object triggers focus on the input element
        textObject.on("pointerdown", () => {
            inputElement.focus();
        });

        window.addEventListener("resize", adjustInputElement);

        // Cleanup on destroy
        textObject.on("destroy", () => {
            document.body.removeChild(inputElement);
            window.removeEventListener("resize", adjustInputElement);
        });
    }

    update() {}
}
