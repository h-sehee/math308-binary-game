import Phaser from "phaser";

export default class LevelAScene extends Phaser.Scene {
    constructor() {
        super({ key: "LevelA"});

    }

    create() {
        this.add.text(165, 280, "Level A", {
            fontSize: "90px",
            color: "red",
        })
    }

    update(){}
}