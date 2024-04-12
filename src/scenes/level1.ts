import Phaser from "phaser";

export default class level1 extends Phaser.Scene {
    constructor() {
        super({ key: "level1" });
    }

    preload() {
        this.load.image("background", "assets/img/background.png");
        this.load.image(
            "monkey-brown-pirate",
            "assets/img/monkeys/monkey-brown-pirate.png"
        );
    }

    create() {
        this.add.image(350, 360, "background");
        this.add.rectangle(640, 0, 1280, 150, 0x0000);
        //const dropZoneColorBrown = this.add.dropZoneColorBrown(640, 0, 1280, 150).setRectangleDropZone(1280, 150);
        this.add.text(545, 10, "Level 1", {
            fontSize: "48px",
        });
        this.add.rectangle(1000, 250, 600, 350, 0xffff);
        this.add.rectangle(1000, 650, 600, 450, 0x9999);

        this.add.image(350, 325, "monkey-brown-pirate");
        this.input.setDraggable(
            this.add
                .text(720, 550, "HELLO", { fontSize: "42px" })
                .setInteractive(),
            true
        );
        this.input.setDraggable(
            this.add
                .text(720, 600, "HELLO2", { fontSize: "42px" })
                .setInteractive(),
            true
        );
        let flag: boolean = false;
        let temp: Phaser.GameObjects.Text | null = null;

        this.add.text(720, 100, "class Monkey:", {
            fontSize: "42px",
            color: "black",
        });

        this.add.text(750, 175, "color:", {
            fontSize: "32px",
            color: "black",
        });
        this.add.text(750, 250, "hat:", {
            fontSize: "32px",
            color: "black",
        });
        //  A drop dropZoneColorBrown
        const dropZoneColorBrown: Phaser.GameObjects.Zone = this.add
            .zone(950, 196, 150, 50)
            .setRectangleDropZone(150, 50)
            .setInteractive();
        const dropZoneHat: Phaser.GameObjects.Zone = this.add
            .zone(950, 246, 150, 50)
            .setRectangleDropZone(150, 50)
            .setInteractive();
        //  Just a visual display of the dropZoneColorBrown
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        if (dropZoneColorBrown.input) {
            graphics.strokeRect(
                dropZoneColorBrown.x -
                    dropZoneColorBrown.input.hitArea.width / 2,
                dropZoneColorBrown.y -
                    dropZoneColorBrown.input.hitArea.height / 2,
                dropZoneColorBrown.input.hitArea.width,
                dropZoneColorBrown.input.hitArea.height
            );
        }

        if (dropZoneHat.input) {
            graphics.strokeRect(
                dropZoneHat.x - dropZoneHat.input.hitArea.width / 2,
                dropZoneHat.y - dropZoneHat.input.hitArea.height / 2,
                dropZoneHat.input.hitArea.width,
                dropZoneHat.input.hitArea.height
            );
        }

        this.input.on(
            "drag",
            (
                pointer: any,
                gameObject: { x: any; y: any },
                dragX: any,
                dragY: any
            ) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        );

        this.input.on(
            "dragenter",
            (
                pointer: any,
                gameObject: Phaser.GameObjects.Text,
                dropZone: Phaser.GameObjects.Zone
            ) => {
                graphics.clear();
                graphics.lineStyle(2, 0x00ffff);
                if (dropZone.input) {
                    graphics.strokeRect(
                        dropZone.x - dropZone.input.hitArea.width / 2,
                        dropZone.y - dropZone.input.hitArea.height / 2,
                        dropZone.input.hitArea.width,
                        dropZone.input.hitArea.height
                    );
                }
            }
        );

        this.input.on(
            "dragleave",
            (
                pointer: any,
                gameObject: Phaser.GameObjects.Text,
                dropZone: Phaser.GameObjects.Zone
            ) => {
                graphics.clear();
                graphics.lineStyle(2, 0xffff00);
                if (dropZone.input) {
                    graphics.strokeRect(
                        dropZone.x - dropZone.input.hitArea.width / 2,
                        dropZone.y - dropZone.input.hitArea.height / 2,
                        dropZone.input.hitArea.width,
                        dropZone.input.hitArea.height
                    );
                }
            }
        );

        this.input.on(
            "drop",
            (
                _pointer: any,
                gameObject: Phaser.GameObjects.Text,
                dropZone: Phaser.GameObjects.Zone
            ) => {
                gameObject.x = dropZone.x - 50;
                gameObject.y = dropZone.y - 25;

                if ((gameObject.text == "HELLO" && dropZone == dropZoneColorBrown) || (gameObject.text == "HELLO2" && dropZone == dropZoneHat)) {
                    gameObject.setColor("green");
                    if (!flag){
                        flag = true;
                        temp = gameObject;
                    } else {
                        if(gameObject.input && temp){
                            gameObject.destroy();
                            temp.destroy();
                        }
                    }
                }
            }
        );

        this.input.on(
            "dragend",
            (
                pointer: any,
                gameObject: Phaser.GameObjects.Text,
                dropped: any
            ) => {
                if (!dropped) {
                    if (gameObject.input) {
                        gameObject.x = gameObject.input.dragStartX;
                        gameObject.y = gameObject.input.dragStartY;
                    }
                }

                graphics.clear();
                graphics.lineStyle(2, 0xffff00);
                if (dropZoneColorBrown.input) {
                    graphics.strokeRect(
                        dropZoneColorBrown.x -
                            dropZoneColorBrown.input.hitArea.width / 2,
                        dropZoneColorBrown.y -
                            dropZoneColorBrown.input.hitArea.height / 2,
                        dropZoneColorBrown.input.hitArea.width,
                        dropZoneColorBrown.input.hitArea.height
                    );
                }
                if (dropZoneHat.input) {
                    graphics.strokeRect(
                        dropZoneHat.x - dropZoneHat.input.hitArea.width / 2,
                        dropZoneHat.y - dropZoneHat.input.hitArea.height / 2,
                        dropZoneHat.input.hitArea.width,
                        dropZoneHat.input.hitArea.height
                    );
                }
            }
        );
    }

    update() {}
}
