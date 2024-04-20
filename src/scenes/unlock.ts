import Phaser from "phaser";

export default class Unlock extends Phaser.Scene {
    private input1?: HTMLInputElement;
    private input2?: HTMLInputElement;
    private input3?: HTMLInputElement;

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
                }
            )
            .setOrigin(0.5)
            .setDepth(2010);

        this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height * (4 / 5),
                "Press Enter to Submit",
                {
                    fontSize: "40px",
                    fontFamily: "cursive",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(2010);

        this.input1 = document.createElement("input");
        this.input2 = document.createElement("input");
        this.input3 = document.createElement("input");

        this.input1.type = "text";
        this.input1.style.width = `${this.cameras.main.width / 5}px`;
        this.input1.style.height = `${this.cameras.main.height / 7}px`;
        this.input1.style.fontSize = "3em";
        this.input1.style.textAlign = "center";
        document.body.appendChild(this.input1);
        this.input1.focus();

        this.input2.type = "text";
        this.input2.style.width = `${this.cameras.main.width / 5}px`;
        this.input2.style.height = `${this.cameras.main.height / 7}px`;
        this.input2.style.fontSize = "3em";
        this.input2.style.textAlign = "center";
        document.body.appendChild(this.input2);
        this.input2.focus();

        this.input3.type = "text";
        this.input3.style.width = `${this.cameras.main.width / 5}px`;
        this.input3.style.height = `${this.cameras.main.height / 7}px`;
        this.input3.style.fontSize = "3em";
        this.input3.style.textAlign = "center";
        document.body.appendChild(this.input3);
        this.input3.focus();

        this.add.dom(
            this.cameras.main.width / 4,
            this.cameras.main.height / 2 + 50,
            this.input1
        );
        this.add.dom(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 50,
            this.input2
        );
        this.add.dom(
            this.cameras.main.width * (3 / 4),
            this.cameras.main.height / 2 + 50,
            this.input3
        );

        const close = this.add
            .text(this.cameras.main.width - 40, 40, "X", {
                fontSize: "50px",
                fontFamily: "cursive",
                strokeThickness: 6,
                stroke: "0xffffff",
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
            if (!this.input1 || !this.input2 || !this.input3) {
                return;
            }
            if (event.key === "Enter") {
                const input1Value = this.input1.value;
                const input2Value = this.input2.value;
                const input3Value = this.input3.value;
                {
                    if (
                        input1Value === "01111001" &&
                        input2Value === "01100101" &&
                        input3Value === "01110011"
                    ) {
                        this.events.emit("altar");
                        this.input.setDefaultCursor("default");
                        this.scene.stop();
                        this.scene.resume("MainScene");
                    } else {
                        this.input1.style.outlineColor =
                            input1Value !== "01111001" ? "red" : "green";
                        this.input1.style.outlineWidth = "5px";
                        this.input2.style.outlineColor =
                            input2Value !== "01100101" ? "red" : "green";
                        this.input2.style.outlineWidth = "5px";
                        this.input3.style.outlineColor =
                            input3Value !== "01110011" ? "red" : "green";
                        this.input3.style.outlineWidth = "5px";

                        this.input1.addEventListener("input", () => {
                            if (!this.input1) {
                                return;
                            }
                            this.input1.style.outlineColor = "initial";
                        });
                        this.input2.addEventListener("input", () => {
                            if (!this.input2) {
                                return;
                            }
                            this.input2.style.outlineColor = "initial";
                        });
                        this.input3.addEventListener("input", () => {
                            if (!this.input3) {
                                return;
                            }
                            this.input3.style.outlineColor = "initial";
                        });
                    }
                }
            }
        });
    }
}
