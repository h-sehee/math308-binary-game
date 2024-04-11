import Phaser from "phaser";

export default class WeaponDesign extends Phaser.Scene {
    private fileList = ["Theseus", "Main"];
    private current = this.fileList[1];
    private theseusFile: Phaser.GameObjects.Group;
    private mainFile: Phaser.GameObjects.Group;

    constructor() {
        super({ key: "weapon-design" });
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
                this.cameras.main.width * 0.7,
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
            .text(265, 28, "Codes", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        this.add
            .rectangle(120, 40, this.cameras.main.width * 0.65, 1, 0x000000)
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
            .image(this.cameras.main.width * 0.7 - 10, 28, "next-button")
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
            .text(120, 28, "Theseus.java", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        const theseus2 = this.add
            .text(85, 50, "public class Theseus {", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);
        const theseus3 = this.add
            .text(
                107,
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
            .text(120, 28, "main.java", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);

        const main2 = this.add
            .text(120, 50, "public static void main(String[] args){", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);
        const main3 = this.add
            .text(120, 65, "Theseus theseus = new Theseus();", {
                fontSize: "12px",
                fontFamily: "Academy Engraved LET",
                strokeThickness: 3,
                stroke: "0xffffff",
            })
            .setOrigin(0.5)
            .setDepth(1000);
        this.mainFile.add(main1);
        this.mainFile.add(main2);
        this.mainFile.add(main3);

        this.mainFile.setVisible(false);

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
            this.scene.resume("mainScene");
        });
        this.input.keyboard?.on("keydown-E", () => {
            this.scene.stop();
            this.scene.resume("mainScene");
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
