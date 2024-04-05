import Phaser from "phaser";
//import PhaserLogo from "../objects/phaserLogo";
//import FpsText from "../objects/fpsText";

export default class level1 extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super({ key: "levelOne" });
    }

    create() {
        this.add.image(2048, 857, "levelBackg");
        this.add.image(3072, 857, "levelBackg");
        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        //const map = this.make.tilemap({ key: "tilemap" });
        //const tileset1 = map.addTilesetImage("ground3", "ground");
        //const tileset2 = map.addTilesetImage("tiles1", "tiles");

        //map.createLayer("ground", tileset1);
        //console.log(map);
    }
}
