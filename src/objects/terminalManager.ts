export class TerminalManager {
    private inputElement: HTMLInputElement;
    private readonly prompt: string = "$> ";

    constructor() {
        this.inputElement = document.createElement("input");
        this.inputElement.type = "text";

        //styling
        this.inputElement.style.position = "fixed";
        this.inputElement.style.bottom = "20px";
        this.inputElement.style.left = "25%";
        this.inputElement.style.width = "50%";
        this.inputElement.style.height = "80px";
        this.inputElement.style.border = "1px solid #ccc";
        this.inputElement.style.backgroundColor = "#2D2E2C";
        this.inputElement.style.color = "white";

        document.body.appendChild(this.inputElement);

        this.inputElement.value = this.prompt;
        this.inputElement.focus();
        this.inputElement.addEventListener(
            "keydown",
            this.handleEnter.bind(this)
        );
    }

    private handleEnter(event: KeyboardEvent) {
        if (event.key === "Enter") {
            const userInput = this.inputElement.value;
            console.log("User input:", userInput);

            // Clear input field after processing
            this.inputElement.value = this.prompt;
        }
    }
}
