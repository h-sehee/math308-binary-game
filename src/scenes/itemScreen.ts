import Phaser from "phaser";

export default class ItemScreen extends Phaser.Scene {
    private selectedItem: string;
    private content: string;

    constructor() {
        super({ key: "item-screen" });
    }

    init(data: { item: string }) {
        this.selectedItem = data.item;
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

        const paper = this.add
            .image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                "paper"
            )
            .setOrigin(0.5)
            .setDepth(2005);

        if (this.selectedItem === "item1") {
            this.add
                .text(
                    this.cameras.main.width / 2,
                    paper.y - paper.height / 4,
                    "★",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
            this.add
                .text(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2,
                    "101100 + 10110",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
        } else if (this.selectedItem === "item2") {
            this.add
                .text(
                    this.cameras.main.width / 2,
                    paper.y - paper.height / 4,
                    "✿",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
            this.add
                .text(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2,
                    "1111111 - 110110",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
        } else if (this.selectedItem === "item3") {
            this.add
                .text(
                    this.cameras.main.width / 2,
                    paper.y - paper.height / 4,
                    "☀",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
            this.add
                .text(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2,
                    "10000 + 111110",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
        } else if (this.selectedItem === "item4") {
            this.add
                .text(
                    this.cameras.main.width / 2,
                    paper.y - paper.height / 4,
                    "☂",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
            this.add
                .text(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2,
                    "1100110 - 100101",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
        } else if (this.selectedItem === "item5") {
            this.add
                .text(
                    this.cameras.main.width / 2,
                    paper.y - paper.height / 4,
                    "☁",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
            this.add
                .text(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2,
                    "1001101 + 101",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
        } else if (this.selectedItem === "item6") {
            this.add
                .text(
                    this.cameras.main.width / 2,
                    paper.y - paper.height / 4,
                    "❄",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
            this.add
                .text(
                    this.cameras.main.width / 2,
                    this.cameras.main.height / 2,
                    "1100011 - 1010",
                    {
                        fontSize: "50px",
                        fontFamily: "cursive",
                        color: "0x291c13",
                        align: "center",
                    }
                )
                .setOrigin(0.5)
                .setDepth(2010);
        }

        const close = this.add
            .text(
                paper.x + paper.width / 2 - 20,
                paper.y - paper.height / 2 + 20,
                "X",
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
}
