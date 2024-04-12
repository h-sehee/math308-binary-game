import Phaser from "phaser";

export default class WeaponDesign extends Phaser.Scene {
    private fileList = ["Theseus", "Main"];
    private current = this.fileList[1];
    private theseusFile: Phaser.GameObjects.Group;
    private mainFile: Phaser.GameObjects.Group;
    private codeList: Phaser.GameObjects.Group;
    private previous: string;
    private itemList: string[];

    constructor() {
        super({ key: "weapon-design" });
    }

    init(data: { from: string; itemList: string[] }) {
        this.previous = data.from;
        this.itemList = data.itemList;
    }

    create() {
        this.add
            .rectangle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                this.cameras.main.width * 0.9,
                this.cameras.main.height * 0.9,
                0xffffff,
                0.85
            )
            .setOrigin(0.5)
            .setDepth(999);

        this.add
            .rectangle(
                this.cameras.main.width * 0.85,
                this.cameras.main.height / 2,
                1,
                this.cameras.main.height * 0.9,
                0x000000
            )
            .setOrigin(0.5)
            .setDepth(1000);

        this.add
            .rectangle(
                this.cameras.main.width / 2,
                40,
                this.cameras.main.width * 0.9,
                1,
                0x000000
            )
            .setOrigin(0.5)
            .setDepth(1000);

        this.add
            .text(this.cameras.main.width * 0.9, 28, "Items", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        //Previous button that will switch to previous java file
        const previous = this.add
            .image(this.cameras.main.width * 0.05 + 10, 28, "next-button")
            .setOrigin(0.5)
            .setDepth(1000);
        previous.scaleX = -1;
        previous.setInteractive();

        previous.on("pointerover", () => {
            previous.setScale(1.1);
            previous.scaleX *= -1;
        });
        previous.on("pointerout", () => {
            previous.setScale(1);
            previous.scaleX *= -1;
        });
        previous.on("pointerdown", () => {
            let currIdx = this.fileList.indexOf(this.current);
            if (currIdx > 0) {
                currIdx--;
            } else {
                currIdx = this.fileList.length - 1;
            }
            this.current = this.fileList[currIdx];
            this.handleFileChange();
        });

        //Next button that will switch to next java file
        const next = this.add
            .image(this.cameras.main.width * 0.85 - 10, 28, "next-button")
            .setOrigin(0.5)
            .setDepth(1000);
        next.setInteractive();

        next.on("pointerover", () => {
            next.setScale(1.1);
        });
        next.on("pointerout", () => {
            next.setScale(1);
        });
        next.on("pointerdown", () => {
            const currIdx = this.fileList.indexOf(this.current);
            this.current = this.fileList[(currIdx + 1) % this.fileList.length];
            this.handleFileChange();
        });

        //Text group of Theseus.java
        this.theseusFile = this.add.group();
        const theseus1 = this.add
            .text(this.cameras.main.width * 0.45, 28, "Theseus.java", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        const theseus2 = this.add
            .text(
                this.cameras.main.width * 0.05 + 65,
                50,
                "public class Theseus {",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        const theseus3 = this.add
            .text(
                this.cameras.main.width * 0.05 + 85,
                85,
                "private double damage ;\nprivate double speed ;\nprivate string weapon ;",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        this.theseusFile.add(theseus1);
        this.theseusFile.add(theseus2);
        this.theseusFile.add(theseus3);

        //Text group of main.java
        this.mainFile = this.add.group();
        const main1 = this.add
            .text(this.cameras.main.width * 0.45, 28, "main.java", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        const main2 = this.add
            .text(
                this.cameras.main.width * 0.05 + 108,
                50,
                "public static void main(String[] args) {",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        const main3 = this.add
            .text(
                this.cameras.main.width * 0.05 + 110,
                67,
                "Theseus theseus = new Theseus();",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        this.mainFile.add(main1);
        this.mainFile.add(main2);
        this.mainFile.add(main3);

        this.mainFile.setVisible(false);
        this.theseusFile.setVisible(false);
        if (this.current === "Theseus") {
            this.theseusFile.setVisible(true);
            this.mainFile.setVisible(false);
        } else if (this.current === "Main") {
            this.mainFile.setVisible(true);
            this.theseusFile.setVisible(false);
        }

        // Display list of items
        this.codeList = this.add.group();

        const addItem = (
            x: number,
            y: number,
            itemName: string,
            itemImg: string
        ) => {
            // const itemContainer = this.add.container(x, y).setDepth(1000);

            // const itemImage = this.add.image(0, 5, itemImg);
            // itemImage.setScale(1.5);

            // const itemText = this.add.text(itemImage.width + 50, 5, itemName, {
            //     color: "#000000",
            // });
            // itemImage.setOrigin(0.5);
            // itemText.setOrigin(0.5);

            // itemContainer.add([itemImage, itemText]);
            // itemContainer.setSize(
            //     itemImage.width * 1.5 + itemText.width,
            //     Math.max(itemImage.height * 1.5, itemText.height)
            // );

            // this.codeList.add(itemContainer);

            const itemImage = this.add
                .image(x, y, itemImg)
                .setOrigin(0.5)
                .setDepth(1000)
                .setScale(1.5);

            this.codeList.add(itemImage);

            itemImage.setInteractive();
            this.input.setDraggable(itemImage);

            this.input.on(
                "drag",
                (
                    pointer: Phaser.Input.Pointer,
                    gameObject: Phaser.GameObjects.Image,
                    dragX: number,
                    dragY: number
                ) => {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                }
            );
        };

        for (let i = 0; i < this.itemList.length; i++) {
            let textureKeyToCountMap = 0;
            this.codeList
                .getChildren()
                .forEach((image: Phaser.GameObjects.GameObject) => {
                    if (image instanceof Phaser.GameObjects.Image) {
                        if (image.texture.key === this.itemList[i]) {
                            textureKeyToCountMap++;
                        }
                    }
                });
            if (
                this.itemList[i] === "sword-fire" ||
                this.itemList[i] === "sword-ice" ||
                this.itemList[i] === "bow-poison" ||
                this.itemList[i] === "bow-triple"
            ) {
                if (textureKeyToCountMap == 0) {
                    addItem(
                        this.cameras.main.width * 0.9,
                        60 + 30 * this.codeList.getLength() - 1,
                        this.itemList[i],
                        this.itemList[i]
                    );
                }
            } else if (
                this.itemList[i] === "sword-damage-up" ||
                this.itemList[i] === "sword-speed-up" ||
                this.itemList[i] === "bow-damage-up" ||
                this.itemList[i] === "bow-speed-up"
            ) {
                addItem(
                    this.cameras.main.width * 0.9,
                    60 + 30 * this.codeList.getLength() - 1,
                    this.itemList[i],
                    this.itemList[i]
                );
            }
        }

        // Close button that will return to the game screen
        const close = this.add
            .text(this.cameras.main.width - 20, 20, "X", {
                fontSize: "25px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 6,
                stroke: "0xffffff",
                //strokeAlpha: 1
            })
            .setOrigin(0.5)
            .setDepth(1000);

        close.setInteractive();
        close.on("pointerover", () => {
            close.setFontSize("27px");
        });
        close.on("pointerout", () => {
            close.setFontSize("25px");
        });
        close.on("pointerdown", () => {
            this.scene.stop();
            this.scene.resume(this.previous, { itemList: this.itemList });
        });
        this.input.keyboard?.on("keydown-E", () => {
            this.scene.stop();
            this.scene.resume(this.previous, { itemList: this.itemList });
        });
    }

    private handleFileChange() {
        if (this.current === "Theseus") {
            this.theseusFile.setVisible(true);
            this.mainFile.setVisible(false);
        } else if (this.current === "Main") {
            this.mainFile.setVisible(true);
            this.theseusFile.setVisible(false);
        }
    }
}
