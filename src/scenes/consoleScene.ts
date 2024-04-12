import Phaser from "phaser";

//import { CONFIG } from "../config";
import { CharacterMovement } from "../util/playerMovement";
import { gameState } from "../objects/gameState";

class ConsoleScene extends Phaser.Scene {
    private numCommands: number = 0;
    private console?: Phaser.GameObjects.DOMElement;
    private consoleDisplay?: Phaser.GameObjects.DOMElement;
    private gameState: gameState;
    private player?: Phaser.Physics.Arcade.Sprite;
    private characterMovement: CharacterMovement;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: "ConsoleScene" });
    }
    init(data: { gameState: gameState }) {
        this.gameState = data.gameState;
    }

    preload() {
        this.load.html("consoleText", "assets/text/console.html");
        this.load.html("consoleDisplay", "assets/text/consoleDisplay.html");
    }
    create() {
        this.add.image(60, -75, "console").setOrigin(0);
        //console.log(this.gameState);

        this.console = this.add.dom(220, 220).createFromCache("consoleText");
        this.consoleDisplay = this.add
            .dom(220, 85)
            .createFromCache("consoleDisplay");
        //change back to the game scene.
        const slashKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.BACK_SLASH
        );
        slashKey?.on("down", this.switchScene, this);
        const enterKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        enterKey?.on("down", this.handleEnterKey, this);
    }
    private switchScene() {
        console.log(this.gameState.curRoom);
        this.console?.setVisible(false);
        this.consoleDisplay?.setVisible(false);
        this.scene.resume(this.gameState.curRoom);
        this.scene.bringToTop(this.gameState.curRoom);
        this.scene.pause("consoleScene");
    }
    private handleEnterKey() {
        if (this.console) {
            const inputField = this.console.getChildByName(
                "consoleInput"
            ) as HTMLInputElement;
            const newText = inputField.value;
            inputField.value = ""; // Clear input field
            const textBlockDiv = document.getElementById("textBlock");
            if (textBlockDiv) {
                if (this.numCommands == 6) {
                    const newParagraph = document.createElement("p");
                    newParagraph.textContent = newText;
                    while (textBlockDiv.firstChild) {
                        textBlockDiv.removeChild(textBlockDiv.firstChild);
                    }
                    textBlockDiv.appendChild(newParagraph);
                    this.numCommands = 1;
                } else {
                    // Append the new text to the existing content
                    const newParagraph = document.createElement("p");
                    newParagraph.textContent = newText;
                    textBlockDiv.appendChild(newParagraph);
                    this.numCommands++;
                }
            }
        }
    }
    update() {}
}
export default ConsoleScene;
