import Phaser from "phaser";

export default class FinalScreen extends Phaser.Scene {
    private itemList: string[];
    private papers: Phaser.GameObjects.Group;

    constructor() {
        super({ key: "final-screen" });
    }

    init(data: { items: string[] }) {
        this.itemList = data.items;
    }

    create() {
        this.add
            .rectangle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                this.cameras.main.width,
                this.cameras.main.height,
                0x000000,
                0.9
            )
            .setOrigin(0.5)
            .setDepth(2000);

        this.add
            .image(
                this.cameras.main.width / 4 + 50,
                this.cameras.main.height * (2 / 5),
                "ascii"
            )
            .setScale(1.2)
            .setOrigin(0.5)
            .setDepth(2000);

        const keys = this.add
            .rectangle(
                this.cameras.main.width * (3 / 4) - 50,
                this.cameras.main.height / 3,
                this.cameras.main.width * (1 / 4),
                this.cameras.main.height / 4,
                0xffffff,
                0.3
            )
            .setOrigin(0.5)
            .setDepth(2000);

        this.add
            .text(keys.x, keys.y - 140, "Decrypt codes using ASCII", {
                fontSize: "30px",
                fontFamily: "cursive",
                color: "white",
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(2010);

        this.add
            .text(keys.x, keys.y - 40, "Order:", {
                fontSize: "30px",
                fontFamily: "cursive",
                color: "0x291c13",
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(2010);

        this.add
            .text(keys.x, keys.y + 30, "★✿☀☂☁❄", {
                fontSize: "50px",
                fontFamily: "cursive",
                color: "0x291c13",
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(2010);

        const pollev = this.add
            .image(keys.x, keys.y + keys.height, "pollev")
            .setScale(0.3)
            .setOrigin(0.5)
            .setDepth(2010);

        pollev.setInteractive();
        pollev.on("pointerover", () => {
            pollev.setScale(0.35);
            this.input.setDefaultCursor("pointer");
        });
        pollev.on("pointerout", () => {
            pollev.setScale(0.3);
            this.input.setDefaultCursor("default");
        });
        pollev.on("pointerdown", () => {
            this.input.setDefaultCursor("default");
            window.open("https://pollev.com/seheehwang844", "_blank");
        });

        this.papers = this.add.group({ classType: Phaser.GameObjects.Image });
        this.papers.createMultiple({
            key: "scroll",
            setXY: {
                x: this.cameras.main.width / 7,
                y: this.cameras.main.height * (5 / 6),
                stepX: this.cameras.main.width / 7,
            },
            quantity: 6,
        });

        this.papers.children.each((go, idx) => {
            const paper = go as Phaser.GameObjects.Image;
            paper.setDepth(2005).setScale(3);
            paper.setData("item", this.itemList[idx]);
            paper.setInteractive();
            paper.on("pointerover", () => {
                paper.setScale(3.2);
                this.input.setDefaultCursor("pointer");
            });
            paper.on("pointerout", () => {
                paper.setScale(3);
                this.input.setDefaultCursor("default");
            });
            paper.on("pointerdown", () => {
                this.input.setDefaultCursor("default");

                this.scene.run("item-screen", { item: paper.getData("item") });
            });
            if (idx < this.itemList.length) {
                paper.setVisible(true);
            } else {
                paper.setVisible(false);
            }
            return true;
        });
    }
}
