import Phaser from "phaser";

export default class Unlock extends Phaser.Scene {
    private input1?: HTMLInputElement;
    private input2?: HTMLInputElement;
    private input3?: HTMLInputElement;
    // private input1;
    constructor() {
        super({ key: "unlock" });
    }

    create() {
        this.add
            .rectangle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                this.cameras.main.width,
                this.cameras.main.height,
                0x000000,
                0.7
            )
            .setOrigin(0.5)
            .setDepth(2000);

        this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 4,
                "Convert following numbers to binary",
                {
                    fontSize: "50px",
                    fontFamily: "cursive",
                    strokeThickness: 6,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(2010);
        this.add
            .text(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 60,
                "121",
                {
                    fontSize: "40px",
                    fontFamily: "cursive",
                    strokeThickness: 6,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(2010);
        this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 - 60,
                "101",
                {
                    fontSize: "40px",
                    fontFamily: "cursive",
                    strokeThickness: 6,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(2010);
        this.add
            .text(
                this.cameras.main.width * (3 / 4),
                this.cameras.main.height / 2 - 60,
                "115",
                {
                    fontSize: "40px",
                    fontFamily: "cursive",
                    strokeThickness: 6,
                    stroke: "0xffffff",
                    //strokeAlpha: 1
                }
            )
            .setOrigin(0.5)
            .setDepth(2010);

        this.input1 = document.createElement("input");
        this.input2 = document.createElement("input");
        this.input3 = document.createElement("input");

        this.input1.type = "text";
        this.input1.style.backgroundPosition = "8px 8px";
        this.input1.style.position = "absolute";
        // this.input1.style.left = `${this.cameras.main.width / 4}px`;
        // this.input1.style.top = "-800px";
        this.input1.style.width = `${this.cameras.main.width / 5}px`;
        this.input1.style.height = `${this.cameras.main.height / 7}px`;
        this.input1.style.zIndex = "2000";
        this.input1.style.fontSize = "3em";
        this.input1.style.textAlign = "center";
        document.body.appendChild(this.input1);
        this.input1.focus();

        this.input2.type = "text";
        this.input2.style.backgroundPosition = "8px 8px";
        this.input2.style.position = "absolute";
        // this.input2.style.left = `${this.cameras.main.width / 2}px`;
        // this.input2.style.top = "-800px";
        this.input2.style.width = `${this.cameras.main.width / 5}px`;
        this.input2.style.height = `${this.cameras.main.height / 7}px`;
        this.input2.style.zIndex = "2000";
        this.input2.style.fontSize = "3em";
        this.input2.style.textAlign = "center";
        document.body.appendChild(this.input2);
        this.input2.focus();

        this.input3.type = "text";
        this.input3.style.backgroundPosition = "8px 8px";
        this.input3.style.position = "absolute";
        // this.input3.style.left = `${this.cameras.main.width * (3 / 4)}px`;
        // this.input3.style.top = "-800px";
        this.input3.style.width = `${this.cameras.main.width / 5}px`;
        this.input3.style.height = `${this.cameras.main.height / 7}px`;
        this.input3.style.zIndex = "2000";
        this.input3.style.fontSize = "3em";
        this.input3.style.textAlign = "center";
        document.body.appendChild(this.input3);
        this.input3.focus();

        this.add.dom(1280 / 4, -800, this.input1);
        this.add.dom(1280 / 2, -800, this.input2);
        this.add.dom(1280 * (3 / 4), -800, this.input3);

        const close = this.add
            .text(this.cameras.main.width - 40, 40, "X", {
                fontSize: "50px",
                fontFamily: "cursive",
                strokeThickness: 6,
                stroke: "0xffffff",
                //strokeAlpha: 1
            })
            .setOrigin(0.5)
            .setDepth(2010);

        close.setInteractive();
        close.on("pointerover", () => {
            close.setFontSize("55px");
            this.input.setDefaultCursor("pointer");
        });
        close.on("pointerout", () => {
            close.setFontSize("50px");
            this.input.setDefaultCursor("default");
        });
        close.on("pointerdown", () => {
            this.input.setDefaultCursor("default");
            this.scene.stop();
            this.scene.resume("MainScene");
        });
    }

    update() {
        window.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const input1Value = this.input1?.value;
                const input2Value = this.input2?.value;
                const input3Value = this.input3?.value;
                if (
                    input1Value !== undefined &&
                    input2Value !== undefined &&
                    input3Value !== undefined
                ) {
                    if (
                        input1Value === "01111001" &&
                        input2Value === "01100101" &&
                        input3Value === "01110011"
                    ) {
                        this.input.setDefaultCursor("default");
                        this.scene.stop();
                        this.scene.resume("MainScene");
                    } else {
                        console.log("wrong answer");
                    }
                }
            }
        });
    }
}
