import Phaser from "phaser";

export default class LoadoutSceneOne extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    constructor() {
        super({ key: "LoadoutSceneOne" });
    }

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        // Create Class Textboxes
        this.makeTextbox("100px", "20px", "330px", "204px", "20px");
        this.makeTextbox("100px", "20px", "727px", "200px", "20px");

        // Create Attribute Textboxes
        this.makeTextbox("170px", "38px", "235px", "258px", "20px");
        this.makeTextbox("170px", "38px", "632px", "254px", "20px");
        this.makeTextbox("170px", "38px", "236px", "324px", "20px");
        this.makeTextbox("170px", "38px", "633px", "320px", "20px");

        // Create Constructor Paramter Textboxes
        this.makeTextbox("46px", "8px", "345px", "420px", "8px");
        this.makeTextbox("46px", "8px", "407px", "420px", "8px");
        this.makeTextbox("46px", "8px", "742px", "416px", "8px");
        this.makeTextbox("46px", "8px", "804px", "416px", "8px");

        // Create Constructor Textboxes
        this.makeTextbox("194px", "12px", "225px", "446px", "12px");
        this.makeTextbox("194px", "12px", "225px", "475px", "12px");
        this.makeTextbox("194px", "12px", "622px", "442px", "12px");
        this.makeTextbox("194px", "12px", "622px", "471px", "12px");

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

        // Create Menu Textboxes
        this.createClickableText(
            2950,
            250,
            "Classes",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            3150,
            450,
            "- Gun",
            "#ff0000",
            "#00000000",
            () => {
                this.scene.start("LoadoutSceneGun");
            }
        );

        this.createClickableText(
            3150,
            650,
            "- Clothes",
            "#ff0000",
            "#00000000",
            () => {
                this.scene.start("LoadoutSceneClothes");
            }
        );

        this.createClickableText(
            3150,
            850,
            "- LOCKED",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            3150,
            1050,
            "- LOCKED",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            3150,
            1250,
            "- LOCKED",
            "#ff0000",
            "#00000000",
            () => {}
        );

        // Handle pointerdown event
        this.textbox.on("pointerdown", () => {
            this.textInput.focus();
        });
    }

    makeTextbox(
        width: string,
        height: string,
        xLoc: string,
        yLoc: string,
        wordSize: string
    ) {
        // Convert input values to integers
        // Create HTML input element
        const textbox = document.createElement("input");
        textbox.type = "text";
        textbox.style.position = "absolute";

        // Set element dimensions and position
        textbox.style.width = width;
        textbox.style.height = height;
        textbox.style.left = xLoc;
        textbox.style.top = yLoc;
        textbox.style.fontSize = wordSize;

        // Set other styles
        textbox.style.fontFamily = "Verdana, sans-serif";
        textbox.style.backgroundColor = "transparent"; // Make the background transparent
        textbox.style.border = "none";

        // Append the input element to the body
        document.body.appendChild(textbox);
    }

    createClickableText(
        x: number,
        y: number,
        text: string,
        textColor: string,
        backdrop: string,
        onClick: () => void
    ): void {
        // Predefined style for all clickable text instances
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: "100px",
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
        };

        const textObject = this.add.text(x, y, text, style).setInteractive();
        textObject.on("pointerdown", onClick);
    }

    update() {
        // Update logic
    }
}
