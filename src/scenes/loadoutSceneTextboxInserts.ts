import Phaser from "phaser";

export default class LoadoutSceneTextboxInserts extends Phaser.Scene {
    textInput: HTMLInputElement;
    textbox: Phaser.GameObjects.DOMElement;

    classOneDef: boolean = false;
    attrOneTopDef: boolean = false;
    attrOneBotDef: boolean = false;
    constrOneLeft: boolean = false;
    constrOneRight: boolean = false;
    constrOneTop: boolean = false;
    constrOneBot: boolean = false;

    classTwoDef: boolean = false;
    attrTwoTopDef: boolean = false;
    attrTwoBotDef: boolean = false;
    constrTwoLeft: boolean = false;
    constrTwoRight: boolean = false;
    constrTwoTop: boolean = false;
    constrTwoBot: boolean = false;

    alpha: boolean = true;

    constructor() {
        super({ key: "LoadoutSceneTextboxInserts", active: true });
    }

    create() {
        this.createEditableText(
            890,
            292,
            "CLASS",
            "#000000",
            "transparent",
            "70px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (newValue == "Gun") {
                    console.log("Set continue to true");
                    this.classOneDef = true;
                } else {
                    this.classOneDef = false;
                }
            }
        );
        this.createEditableText(
            640,
            650,
            "ATTRIBUTE:TYPE;",
            "#000000",
            "transparent",
            "50px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "Close:Scope;" ||
                    newValue == "Close: Scope;" ||
                    newValue == "Close :Scope;" ||
                    newValue == "Eagle:Scope;" ||
                    newValue == "Eagle: Scope;" ||
                    newValue == "Eagle :Scope;" ||
                    newValue == "Speed:Magazine;" ||
                    newValue == "Speed: Magazine;" ||
                    newValue == "Speed :Magazine;" ||
                    newValue == "Drum:Magazine;" ||
                    newValue == "Drum: Magazine;" ||
                    newValue == "Drum :Magazine;"
                ) {
                    console.log("Set continue to true");
                    this.attrOneBotDef = true;
                } else {
                    this.attrOneBotDef = false;
                }
            }
        );
        this.createEditableText(
            640,
            470,
            "ATTRIBUTE:TYPE;",
            "#000000",
            "transparent",
            "50px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "Close:Scope;" ||
                    newValue == "Close: Scope;" ||
                    newValue == "Close :Scope;" ||
                    newValue == "Eagle:Scope;" ||
                    newValue == "Eagle: Scope;" ||
                    newValue == "Eagle :Scope;" ||
                    newValue == "Speed:Magazine;" ||
                    newValue == "Speed: Magazine;" ||
                    newValue == "Speed :Magazine;" ||
                    newValue == "Drum:Magazine;" ||
                    newValue == "Drum: Magazine;" ||
                    newValue == "Drum :Magazine;"
                ) {
                    console.log("Set continue to true");
                    this.attrOneTopDef = true;
                } else {
                    this.attrOneTopDef = false;
                }
            }
        );
        this.createEditableText(
            868,
            880,
            "ATTRIBUTE:TYPE",
            "#000000",
            "transparent",
            "22px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "Close:Scope;" ||
                    newValue == "Close: Scope;" ||
                    newValue == "Close :Scope;" ||
                    newValue == "Eagle:Scope;" ||
                    newValue == "Eagle: Scope;" ||
                    newValue == "Eagle :Scope;" ||
                    newValue == "Speed:Magazine;" ||
                    newValue == "Speed: Magazine;" ||
                    newValue == "Speed :Magazine;" ||
                    newValue == "Drum:Magazine;" ||
                    newValue == "Drum: Magazine;" ||
                    newValue == "Drum :Magazine;"
                ) {
                    console.log("Set continue to true");
                    this.constrOneLeft = true;
                } else {
                    this.constrOneLeft = false;
                }
            }
        );
        this.createEditableText(
            1087,
            880,
            "ATTRIBUTE:TYPE",
            "#000000",
            "transparent",
            "22px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "Close:Scope;" ||
                    newValue == "Close: Scope;" ||
                    newValue == "Close :Scope;" ||
                    newValue == "Eagle:Scope;" ||
                    newValue == "Eagle: Scope;" ||
                    newValue == "Eagle :Scope;" ||
                    newValue == "Speed:Magazine;" ||
                    newValue == "Speed: Magazine;" ||
                    newValue == "Speed :Magazine;" ||
                    newValue == "Drum:Magazine;" ||
                    newValue == "Drum: Magazine;" ||
                    newValue == "Drum :Magazine;"
                ) {
                    console.log("Set continue to true");
                    this.constrOneRight = true;
                } else {
                    this.constrOneRight = false;
                }
            }
        );
        this.createEditableText(
            600,
            945,
            "this.ATTRIBUTE = ATTRIBUTE;",
            "#000000",
            "transparent",
            "35px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "this.Close = Close;" ||
                    newValue == "this.Close=Close;" ||
                    newValue == "this.Close =Close;" ||
                    newValue == "this.Close=Close;" ||
                    newValue == "this.Eagle = Eagle;" ||
                    newValue == "this.Eagle =Eagle;" ||
                    newValue == "this.Eagle= Eagle;" ||
                    newValue == "this.Eagle=Eagle;" ||
                    newValue == "this.Speed = Speed;" ||
                    newValue == "this.Speed= Speed;" ||
                    newValue == "this.Speed =Speed;" ||
                    newValue == "this.Speed=Speed;" ||
                    newValue == "this.Drum = Drum;" ||
                    newValue == "this.Drum= Drum;" ||
                    newValue == "this.Drum =Drum;" ||
                    newValue == "this.Drum=Drum;"
                ) {
                    console.log("Set continue to true");
                    this.constrOneTop = true;
                } else {
                    this.constrOneTop = false;
                }
            }
        );
        this.createEditableText(
            600,
            1025,
            "this.ATTRIBUTE = ATTRIBUTE;",
            "#000000",
            "transparent",
            "35px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "this.Close = Close;" ||
                    newValue == "this.Close=Close;" ||
                    newValue == "this.Close =Close;" ||
                    newValue == "this.Close=Close;" ||
                    newValue == "this.Eagle = Eagle;" ||
                    newValue == "this.Eagle =Eagle;" ||
                    newValue == "this.Eagle= Eagle;" ||
                    newValue == "this.Eagle=Eagle;" ||
                    newValue == "this.Speed = Speed;" ||
                    newValue == "this.Speed= Speed;" ||
                    newValue == "this.Speed =Speed;" ||
                    newValue == "this.Speed=Speed;" ||
                    newValue == "this.Drum = Drum;" ||
                    newValue == "this.Drum= Drum;" ||
                    newValue == "this.Drum =Drum;" ||
                    newValue == "this.Drum=Drum;"
                ) {
                    console.log("Set continue to true");
                    this.constrOneBot = true;
                } else {
                    this.constrOneBot = false;
                }
            }
        );

        this.createEditableText(
            1920,
            292,
            "CLASS",
            "#000000",
            "transparent",
            "70px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (newValue == "Clothes") {
                    console.log("Set continue to true");
                    this.classOneDef = true;
                } else {
                    this.classOneDef = false;
                }
            }
        );
        this.createEditableText(
            1670,
            650,
            "ATTRIBUTE:TYPE;",
            "#000000",
            "transparent",
            "50px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "Poncho:Shirt;" ||
                    newValue == "Poncho: Shirt;" ||
                    newValue == "Poncho :Shirt;" ||
                    newValue == "Vest:Shirt;" ||
                    newValue == "Vest: Shirt;" ||
                    newValue == "Vest :Shirt;" ||
                    newValue == "Overalls:Pants;" ||
                    newValue == "Overalls: Pants;" ||
                    newValue == "Overalls :Pants;" ||
                    newValue == "Cargo:Pants;" ||
                    newValue == "Cargo: Pants;" ||
                    newValue == "Cargo :Pants;"
                ) {
                    console.log("Set continue to true");
                    this.attrTwoTopDef = true;
                } else {
                    this.attrTwoTopDef = false;
                }
            }
        );
        this.createEditableText(
            1670,
            470,
            "ATTRIBUTE:TYPE;",
            "#000000",
            "transparent",
            "50px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "Poncho:Shirt;" ||
                    newValue == "Poncho: Shirt;" ||
                    newValue == "Poncho :Shirt;" ||
                    newValue == "Vest:Shirt;" ||
                    newValue == "Vest: Shirt;" ||
                    newValue == "Vest :Shirt;" ||
                    newValue == "Overalls:Pants;" ||
                    newValue == "Overalls: Pants;" ||
                    newValue == "Overalls :Pants;" ||
                    newValue == "Cargo:Pants;" ||
                    newValue == "Cargo: Pants;" ||
                    newValue == "Cargo :Pants;"
                ) {
                    console.log("Set continue to true");
                    this.attrTwoBotDef = true;
                } else {
                    this.attrTwoBotDef = false;
                }
            }
        );
        this.createEditableText(
            1896,
            878,
            "ATTRIBUTE:TYPE",
            "#000000",
            "transparent",
            "22px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "Poncho:Shirt;" ||
                    newValue == "Poncho: Shirt;" ||
                    newValue == "Poncho :Shirt;" ||
                    newValue == "Vest:Shirt;" ||
                    newValue == "Vest: Shirt;" ||
                    newValue == "Vest :Shirt;" ||
                    newValue == "Overalls:Pants;" ||
                    newValue == "Overalls: Pants;" ||
                    newValue == "Overalls :Pants;" ||
                    newValue == "Cargo:Pants;" ||
                    newValue == "Cargo: Pants;" ||
                    newValue == "Cargo :Pants;"
                ) {
                    console.log("Set continue to true");
                    this.constrTwoLeft = true;
                } else {
                    this.constrTwoLeft = false;
                }
            }
        );
        this.createEditableText(
            2117,
            878,
            "ATTRIBUTE:TYPE",
            "#000000",
            "transparent",
            "22px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "Poncho:Shirt;" ||
                    newValue == "Poncho: Shirt;" ||
                    newValue == "Poncho :Shirt;" ||
                    newValue == "Vest:Shirt;" ||
                    newValue == "Vest: Shirt;" ||
                    newValue == "Vest :Shirt;" ||
                    newValue == "Overalls:Pants;" ||
                    newValue == "Overalls: Pants;" ||
                    newValue == "Overalls :Pants;" ||
                    newValue == "Cargo:Pants;" ||
                    newValue == "Cargo: Pants;" ||
                    newValue == "Cargo :Pants;"
                ) {
                    console.log("Set continue to true");
                    this.constrTwoRight = true;
                } else {
                    this.constrTwoRight = false;
                }
            }
        );
        this.createEditableText(
            1630,
            942,
            "this.ATTRIBUTE = ATTRIBUTE;",
            "#000000",
            "transparent",
            "35px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "this.Poncho = Poncho;" ||
                    newValue == "this.Poncho= Poncho;" ||
                    newValue == "this.Poncho =Poncho;" ||
                    newValue == "this.Poncho=Poncho;" ||
                    newValue == "this.Vest = Vest;" ||
                    newValue == "this.Vest= Vest;" ||
                    newValue == "this.Vest =Vest;" ||
                    newValue == "this.Vest=Vest;" ||
                    newValue == "this.Overalls = Overalls;" ||
                    newValue == "this.Overalls= Overalls;" ||
                    newValue == "this.Overalls =Overalls;" ||
                    newValue == "this.Overalls=Overalls;" ||
                    newValue == "this.Cargo = Cargo;" ||
                    newValue == "this.Cargo= Cargo;" ||
                    newValue == "this.Cargo =Cargo;" ||
                    newValue == "this.Cargo=Cargo;"
                ) {
                    console.log("Set continue to true");
                    this.constrTwoTop = true;
                } else {
                    this.constrTwoTop = false;
                }
            }
        );
        this.createEditableText(
            1630,
            1022,
            "this.ATTRIBUTE = ATTRIBUTE;",
            "#000000",
            "transparent",
            "35px",
            (newValue: string) => {
                console.log("Text input updated to:", newValue);
                if (
                    newValue == "this.Poncho = Poncho;" ||
                    newValue == "this.Poncho= Poncho;" ||
                    newValue == "this.Poncho =Poncho;" ||
                    newValue == "this.Poncho=Poncho;" ||
                    newValue == "this.Vest = Vest;" ||
                    newValue == "this.Vest= Vest;" ||
                    newValue == "this.Vest =Vest;" ||
                    newValue == "this.Vest=Vest;" ||
                    newValue == "this.Overalls = Overalls;" ||
                    newValue == "this.Overalls= Overalls;" ||
                    newValue == "this.Overalls =Overalls;" ||
                    newValue == "this.Overalls=Overalls;" ||
                    newValue == "this.Cargo = Cargo;" ||
                    newValue == "this.Cargo= Cargo;" ||
                    newValue == "this.Cargo =Cargo;" ||
                    newValue == "this.Cargo=Cargo;"
                ) {
                    console.log("Set continue to true");
                    this.constrTwoBot = true;
                } else {
                    this.constrTwoBot = false;
                }
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

        this.createClickableText(
            1025,
            1450,
            "SUBMIT CODE",
            "#000000",
            "#00ff00",
            () => {
                // If statement for full release
                /*if (
                    this.classOneDef &&
                    this.attrOneTopDef &&
                    this.attrOneBotDef &&
                    this.constrOneLeft &&
                    this.constrOneRight &&
                    this.constrOneTop &&
                    this.constrOneBot &&
                    this.classTwoDef &&
                    this.attrTwoTopDef &&
                    this.attrTwoBotDef &&
                    this.constrTwoLeft &&
                    this.constrTwoRight &&
                    this.constrTwoTop &&
                    this.constrTwoBot
                )*/
                //If statement for alpha version
                if (this.alpha) {
                    this.scene.start("levelOne");
                }
            }
        );
    }

    createEditableText(
        x: number,
        y: number,
        initialText: string,
        textColor: string,
        backdrop: string,
        textSize: string,
        onChange: (newValue: string) => void
    ): void {
        // Adjusts the method for creating editable text elements, focusing on integration with the overlay.
        const globalInputText =
            (this.registry.get("gameInputText") as string) || initialText;

        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: textSize,
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
            padding: { left: 5, right: 5, top: 5, bottom: 5 },
        };

        const textObject = this.add
            .text(x, y, globalInputText, style)
            .setInteractive();

        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = globalInputText;
        inputElement.style.position = "fixed";
        inputElement.style.left = "-9999px";
        inputElement.style.top = "0px";
        document.body.appendChild(inputElement);

        const syncTextObject = () => {
            textObject.setText(inputElement.value || initialText);
            onChange(inputElement.value);
        };

        inputElement.oninput = syncTextObject;

        textObject.on("pointerdown", () => {
            inputElement.value =
                textObject.text === initialText ? "" : textObject.text;
            inputElement.focus();
            inputElement.setSelectionRange(
                inputElement.value.length,
                inputElement.value.length
            );
        });

        inputElement.addEventListener("input", syncTextObject);

        this.events.once("shutdown", () =>
            document.body.removeChild(inputElement)
        );
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

    update() {}
}
