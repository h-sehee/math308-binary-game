import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.spritesheet("robot_idle", "assets/sprites/robot_idle.png", {
            //all robot sprites from the game Enter the Gungeon. Accessed from https://www.spriters-resource.com/pc_computer/enterthegungeon/sheet/155565/
            frameWidth: 18,
            frameHeight: 22,
        });
        this.load.spritesheet(
            "robot_walk_DR",
            "assets/sprites/robot_walk_down_right.png",
            {
                //also use this for straight right
                frameWidth: 18,
                frameHeight: 22,
            }
        );
        this.load.spritesheet(
            "robot_walk_DL",
            "assets/sprites/robot_walk_down_left.png",
            {
                //also use this for straight left
                frameWidth: 18,
                frameHeight: 22,
            }
        );
        this.load.spritesheet(
            "robot_walk_D",
            "assets/sprites/robot_walk_down.png",
            {
                frameWidth: 18,
                frameHeight: 22,
            }
        );
        this.load.spritesheet(
            "robot_walk_UR",
            "assets/sprites/robot_walk_up_right.png",
            {
                frameWidth: 18,
                frameHeight: 22,
            }
        );
        this.load.spritesheet(
            "robot_walk_UL",
            "assets/sprites/robot_walk_up_left.png",
            {
                frameWidth: 18,
                frameHeight: 22,
            }
        );
        this.load.spritesheet(
            "robot_walk_U",
            "assets/sprites/robot_walk_up.png",
            {
                frameWidth: 18,
                frameHeight: 22,
            }
        );
        this.load.spritesheet(
            "demon_idle",
            "assets/sprites/demon_walk_right.png",
            {
                frameWidth: 32,
                frameHeight: 36,
            }
        );
        this.load.spritesheet(
            "demon_walk_R",
            "assets/sprites/demon_walk_right.png",
            {
                frameWidth: 32,
                frameHeight: 36,
            }
        );
        this.load.spritesheet(
            "demon_walk_L",
            "assets/sprites/demon_walk_left.png",
            {
                frameWidth: 32,
                frameHeight: 36,
            }
        );
        this.load.spritesheet(
            "chort_idle",
            "assets/sprites/chort_walk_right.png",
            {
                frameWidth: 16,
                frameHeight: 23,
            }
        );
        this.load.spritesheet(
            "chort_walk_R",
            "assets/sprites/chort_walk_right.png",
            {
                frameWidth: 16,
                frameHeight: 23,
            }
        );
        this.load.spritesheet(
            "chort_walk_L",
            "assets/sprites/chort_walk_left.png",
            {
                frameWidth: 16,
                frameHeight: 23,
            }
        );
        this.load.image("tiles", "assets/tiles/tilemap.png");
        this.load.tilemapTiledJSON(
            "lobby",
            "assets/tilemaps/lobby_room_new.json"
        );
        this.load.tilemapTiledJSON("room01", "assets/tilemaps/room01.json");
    }

    create() {
        this.scene.start("TitleScene");
    }
}
