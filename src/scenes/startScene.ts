    import Phaser from "phaser";

    export default class StartScene extends Phaser.Scene {

        private startBtn: Phaser.GameObjects.Image;

        constructor() {
            super({ key: "StartScene" });
        }

        create() {
            this.add.image(640, 360, "startBackground");

            this.add.text(165, 280, '$>Bash the Dungeon', {
                fontSize: "85px",
                color: "#fff",
            })

            this.startBtn = this.add.image(640, 450, "startBtn");
            this.startBtn.setScale(0.5);
            this.startBtn.setInteractive(); 
        }

        update() {
            this.startBtn.on('pointerdown', () => {
                this.scene.start("LevelA");
            });
        }
    }
