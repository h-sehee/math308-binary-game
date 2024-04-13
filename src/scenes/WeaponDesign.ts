import Phaser from "phaser";
// import { sceneEvents } from "../events/eventsCenter";

export default class WeaponDesign extends Phaser.Scene {
    private fileList = ["Main", "Theseus", "Sword", "Bow"];
    private current = this.fileList[0];

    private theseusFile: Phaser.GameObjects.Group;
    private mainFile: Phaser.GameObjects.Group;
    private swordFile: Phaser.GameObjects.Group;
    private bowFile: Phaser.GameObjects.Group;
    private codeList: Phaser.GameObjects.Group;
    private upgradeList: Phaser.GameObjects.Group;
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
        const theseusTitle = this.add
            .text(this.cameras.main.width * 0.45, 28, "Theseus.java", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        const theseusBody = this.add
            .text(
                this.cameras.main.width * 0.05 + 77,
                78,
                "public class Theseus {\n" +
                    "\t\t\t\tprivate double speed ;\n" +
                    "\t\t\t\tprivate Sword sword ;\n" +
                    "\t\t\t\tprivate Bow bow ;",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        const theseusConstructor = this.add
            .text(
                this.cameras.main.width * 0.1 + 82,
                168,
                "public Theseus() {\n" +
                    "\t\t\t\tthis.speed = \n" +
                    "\t\t\t\tthis.sword = new Sword() ; \n" +
                    "\t\t\t\tthis.bow = new Bow() ;\n}",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        const theseusGetterSetter = this.add
            .text(
                this.cameras.main.width * 0.3 + 59,
                265,
                "public double getSpeed() { return this.speed ; }\n" +
                    "public double getSword() { return this.sword ; }\n" +
                    "public double getBow() { return this.bow ; }\n" +
                    "public void setSpeed(double speed) { this.speed = speed ; }\n",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        const theseusClose = this.add
            .text(this.cameras.main.width * 0.05 + 10, 305, "}", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        this.theseusFile.add(theseusTitle);
        this.theseusFile.add(theseusBody);
        this.theseusFile.add(theseusConstructor);
        this.theseusFile.add(theseusGetterSetter);
        this.theseusFile.add(theseusClose);

        //Text group of main.java
        this.mainFile = this.add.group();
        const mainTitle = this.add
            .text(this.cameras.main.width * 0.45, 28, "main.java", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        const mainBody = this.add
            .text(
                this.cameras.main.width * 0.05 + 110,
                60,
                "public static void main(String[] args) {\n" +
                    "\t\t\t\tTheseus theseus = new Theseus() ;",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        this.mainFile.add(mainTitle);
        this.mainFile.add(mainBody);

        //Text group of Theseus.java
        this.swordFile = this.add.group();
        const swordTitle = this.add
            .text(this.cameras.main.width * 0.45, 28, "Sword.java", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        const swordBody = this.add
            .text(
                this.cameras.main.width * 0.05 + 82,
                78,
                "public class Sword {\n" +
                    "\t\t\t\tprivate double damage ;\n" +
                    "\t\t\t\tprivate double speed ;\n" +
                    "\t\t\t\tprivate string type ;",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        const swordConstructor = this.add
            .text(
                this.cameras.main.width * 0.1 + 63,
                168,
                "public Sword() {\n" +
                    "\t\t\t\tthis.damage = 5 ;\n" +
                    "\t\t\t\tthis.speed = 2 ; \n" +
                    '\t\t\t\tthis.type =  "classic";\n}',
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        const swordGetterSetter = this.add
            .text(
                this.cameras.main.width * 0.3 + 38,
                265,
                "public double getDamage() { return this.damage ; }\n" +
                    "public double getSpeed() { return this.speed ; }\n" +
                    "public double getType() { return this.type ; }\n" +
                    "public void setType(string type) { this.type = type ; }\n",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        const swordMethods = this.add
            .text(
                this.cameras.main.width * 0.3 + 25,
                320,
                "public void incDamage() { this.damage += 2 ; }\n" +
                    "public void incSpeed() { this.speed += 1 ; }",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        const swordClose = this.add
            .text(this.cameras.main.width * 0.05 + 10, 347, "}", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        this.swordFile.add(swordTitle);
        this.swordFile.add(swordBody);
        this.swordFile.add(swordConstructor);
        this.swordFile.add(swordGetterSetter);
        this.swordFile.add(swordMethods);
        this.swordFile.add(swordClose);

        //Text group of Theseus.java
        this.bowFile = this.add.group();
        const bowTitle = this.add
            .text(this.cameras.main.width * 0.45, 28, "Bow.java", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        const bowBody = this.add
            .text(
                this.cameras.main.width * 0.05 + 82,
                78,
                "public class Bow {\n" +
                    "\t\t\t\tprivate double damage ;\n" +
                    "\t\t\t\tprivate double speed ;\n" +
                    "\t\t\t\tprivate string type ;",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        const bowConstructor = this.add
            .text(
                this.cameras.main.width * 0.1 + 63,
                168,
                "public Bow() {\n" +
                    "\t\t\t\tthis.damage = 3 ;\n" +
                    "\t\t\t\tthis.speed = 3 ; \n" +
                    '\t\t\t\tthis.type =  "classic";\n}',
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        const bowGetterSetter = this.add
            .text(
                this.cameras.main.width * 0.3 + 38,
                265,
                "public double getDamage() { return this.damage ; }\n" +
                    "public double getSpeed() { return this.speed ; }\n" +
                    "public double getType() { return this.type ; }\n" +
                    "public void setType(string type) { this.type = type ; }\n",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);
        const bowMethods = this.add
            .text(
                this.cameras.main.width * 0.3 + 25,
                320,
                "public void incDamage() { this.damage += 1 ; }\n" +
                    "public void incSpeed() { this.speed += 1 ; }",
                {
                    fontSize: "12px",
                    fontFamily: "Academy Engraved LET",
                    strokeThickness: 3,
                    stroke: "0xffffff",
                }
            )
            .setOrigin(0.5)
            .setDepth(1000);

        const bowClose = this.add
            .text(this.cameras.main.width * 0.05 + 10, 347, "}", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        this.bowFile.add(bowTitle);
        this.bowFile.add(bowBody);
        this.bowFile.add(bowConstructor);
        this.bowFile.add(bowGetterSetter);
        this.bowFile.add(bowMethods);
        this.bowFile.add(bowClose);

        // Displaying main file by default
        this.theseusFile.setVisible(false);
        this.swordFile.setVisible(false);
        this.bowFile.setVisible(false);

        // Display list of items
        this.codeList = this.add.group();

        const addItem = (
            x: number,
            y: number,
            itemName: string,
            itemImg: string
        ) => {
            const itemImage = this.add
                .image(x, y, itemImg)
                .setOrigin(0.5)
                .setDepth(2000)
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

            this.input.on(
                "dragend",
                (
                    pointer: Phaser.Input.Pointer,
                    gameObject: Phaser.GameObjects.Image,
                    dropped: boolean
                ) => {
                    if (!dropped) {
                        gameObject.x = x;
                        gameObject.y = y;
                    }
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

        // box where the item will be dropped
        this.upgradeList = this.add.group({
            classType: Phaser.GameObjects.Graphics,
        });

        let boxX = this.cameras.main.width * 0.1 - 5;
        let boxY = this.cameras.main.height * 0.25;

        for (let i = 0; i < 6; i++) {
            // boxY += this.cameras.main.height * 0.08 + 11;
            this.upgradeList.get(boxX, boxY, "item-box");
        }

        this.upgradeList.children.iterate((c) => {
            const boxWidth = this.cameras.main.width * 0.7 + 10;
            const boxHeight = this.cameras.main.height * 0.08;

            const box = c as Phaser.GameObjects.Graphics;

            const zone = this.add
                .zone(
                    boxX + boxWidth / 2,
                    boxY + boxHeight / 2,
                    boxWidth,
                    boxHeight
                )
                .setRectangleDropZone(boxWidth, boxHeight)
                .setDepth(1700)
                .setOrigin(0.5);

            box.fillStyle(0xffffff, 1);
            box.fillRect(boxX, boxY, boxWidth, boxHeight);
            box.lineStyle(2, 0x000000);
            box.strokeRect(boxX, boxY, boxWidth, boxHeight);
            box.setDepth(1500);

            boxY += boxHeight + 11;

            this.input.on(
                "dragenter",
                (
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    pointer: Phaser.Input.Pointer,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    gameObject: Phaser.GameObjects.Image,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    dropZone: Phaser.GameObjects.Graphics
                ) => {
                    box.fillStyle(0x808080, 1);
                    box.fillRect(boxX, boxY, boxWidth, boxHeight);
                    box.lineStyle(2, 0x00ffff);
                    // box.strokeRect(boxX, boxY, boxWidth, boxHeight);
                    box.strokeRect(
                        zone.x - zone.input?.hitArea.width / 2,
                        zone.y - zone.input?.hitArea.height / 2,
                        zone.input?.hitArea.width,
                        zone.input?.hitArea.height
                    );
                }
            );

            this.input.on(
                "dragleave",
                (
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    pointer: Phaser.Input.Pointer,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    gameObject: Phaser.GameObjects.Image,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    dropZone: Phaser.GameObjects.Graphics
                ) => {
                    box.fillStyle(0xffffff, 1);
                    box.fillRect(boxX, boxY, boxWidth, boxHeight);
                    box.lineStyle(2, 0x000000);
                    // box.strokeRect(boxX, boxY, boxWidth, boxHeight);
                    box.strokeRect(
                        zone.x - zone.input?.hitArea.width / 2,
                        zone.y - zone.input?.hitArea.height / 2,
                        zone.input?.hitArea.width,
                        zone.input?.hitArea.height
                    );
                }
            );

            this.input.on(
                "drop",
                (
                    pointer: Phaser.Input.Pointer,
                    gameObject: Phaser.GameObjects.Image,
                    dropZone: Phaser.GameObjects.Zone
                ) => {
                    gameObject.x = dropZone.x;
                    gameObject.y = dropZone.y;

                    gameObject.setVisible(false);
                }
            );
            return true;
        });

        /*
        for (let i = 0; i < 6; i++) {
            const boxWidth = this.cameras.main.width * 0.7 + 10;
            const boxHeight = this.cameras.main.height * 0.08;

            const zone = this.add
                .zone(
                    boxX + boxWidth / 2,
                    boxY + boxHeight / 2,
                    boxWidth,
                    boxHeight
                )
                .setRectangleDropZone(boxWidth, boxHeight)
                .setDepth(1700)
                .setOrigin(0.5);

            const box = this.add.graphics().setDepth(1500);

            box.fillStyle(0xffffff, 1);
            box.fillRect(boxX, boxY, boxWidth, boxHeight);
            box.lineStyle(2, 0x000000);
            box.strokeRect(boxX, boxY, boxWidth, boxHeight);
            // box.strokeRect(
            //     zone.x - zone.input?.hitArea.width / 2,
            //     zone.y - zone.input?.hitArea.height / 2,
            //     zone.input?.hitArea.width,
            //     zone.input?.hitArea.height
            // );

            this.input.on(
                "dragenter",
                (
                    pointer: Phaser.Input.Pointer,
                    gameObject: Phaser.GameObjects.Image,
                    dropZone: Phaser.GameObjects.Graphics
                ) => {
                    box.fillStyle(0x808080, 1);
                    box.fillRect(boxX, boxY, boxWidth, boxHeight);
                    box.lineStyle(2, 0x00ffff);
                    // box.strokeRect(boxX, boxY, boxWidth, boxHeight);
                    box.strokeRect(
                        zone.x - zone.input?.hitArea.width / 2,
                        zone.y - zone.input?.hitArea.height / 2,
                        zone.input?.hitArea.width,
                        zone.input?.hitArea.height
                    );
                }
            );

            this.input.on(
                "dragleave",
                (
                    pointer: Phaser.Input.Pointer,
                    gameObject: Phaser.GameObjects.Image,
                    dropZone: Phaser.GameObjects.Graphics
                ) => {
                    box.fillStyle(0xffffff, 1);
                    box.fillRect(boxX, boxY, boxWidth, boxHeight);
                    box.lineStyle(2, 0x000000);
                    // box.strokeRect(boxX, boxY, boxWidth, boxHeight);
                    box.strokeRect(
                        zone.x - zone.input?.hitArea.width / 2,
                        zone.y - zone.input?.hitArea.height / 2,
                        zone.input?.hitArea.width,
                        zone.input?.hitArea.height
                    );
                }
            );

            this.input.on(
                "drop",
                (
                    pointer: Phaser.Input.Pointer,
                    gameObject: Phaser.GameObjects.Image,
                    dropZone: Phaser.GameObjects.Zone
                ) => {
                    gameObject.x = dropZone.x;
                    gameObject.y = dropZone.y;

                    gameObject.setVisible(false);
                }
            );

            // box.setInteractive(
            //     new Phaser.Geom.Rectangle(boxX, boxY, boxWidth, boxHeight),
            //     Phaser.Geom.Rectangle.Contains
            // );

            boxY += boxHeight + 11;
        }
        */

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
        if (this.current === "Main") {
            this.mainFile.setVisible(true);
            this.theseusFile.setVisible(false);
            this.swordFile.setVisible(false);
            this.bowFile.setVisible(false);
        } else if (this.current === "Theseus") {
            this.mainFile.setVisible(false);
            this.theseusFile.setVisible(true);
            this.swordFile.setVisible(false);
            this.bowFile.setVisible(false);
        } else if (this.current === "Sword") {
            this.mainFile.setVisible(false);
            this.theseusFile.setVisible(false);
            this.swordFile.setVisible(true);
            this.bowFile.setVisible(false);
        } else if (this.current === "Bow") {
            this.mainFile.setVisible(false);
            this.theseusFile.setVisible(false);
            this.swordFile.setVisible(false);
            this.bowFile.setVisible(true);
        }
    }
}
