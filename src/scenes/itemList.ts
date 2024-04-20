import Phaser from "phaser";

export default class ItemList extends Phaser.Scene {
    private itemList: string[];
    private papers: Phaser.GameObjects.Group;

    constructor() {
        super({ key: "item-list" });
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
                0.8
            )
            .setOrigin(0.5)
            .setDepth(2000);

        this.papers = this.add.group({ classType: Phaser.GameObjects.Image });
        this.papers.createMultiple({
            key: "scroll",
            setXY: {
                x: this.cameras.main.width / 7,
                y: this.cameras.main.height / 2,
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

        const close = this.add
            .text(this.cameras.main.width - 70, 70, "X", {
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
        this.input.keyboard?.on("keydown-E", () => {
            this.input.setDefaultCursor("default");
            this.scene.stop();
            this.scene.resume("MainScene");
        });
    }
}
