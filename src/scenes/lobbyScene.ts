import Phaser from "phaser";
import { CONFIG } from "../config";

class LobbyScene extends Phaser.Scene {
    constructor() {
        super({ key: "LobbyScene" });
    }

    preload() {}

    create() {
        const map = this.make.tilemap({ key: "lobby" });
        const tileset = map.addTilesetImage("tilemap", "tiles"); //name of tilemap ON TILED, then name of key in preloader scene
        if (tileset) {
            const ground = map.createLayer("Ground", tileset);
            const walls = map.createLayer("Walls", tileset);
            const objects = map.createLayer("Objects", tileset);
            const smallObjs = map.createLayer("Smalls", tileset);
            walls?.setCollisionByProperty({ collides: true });
            walls?.setScale(1);
            ground?.setScale(1);
            objects?.setScale(1);
            smallObjs?.setScale(1);

            const debugGraphics = this.add.graphics().setAlpha(0.7);
            if (CONFIG.physics.arcade.debug) {
                walls?.renderDebug(debugGraphics, {
                    tileColor: null,
                    collidingTileColor: new Phaser.Display.Color(
                        243,
                        234,
                        48,
                        255
                    ),
                    faceColor: new Phaser.Display.Color(30, 39, 37, 255),
                });
            }
        }
    }
}
export default LobbyScene;
