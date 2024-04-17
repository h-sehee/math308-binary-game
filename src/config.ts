import Phaser from "phaser";
import MainScene from "./scenes/mainScene";
import PreloadScene from "./scenes/preloadScene";
import LoadoutSceneTextboxInserts from "./scenes/loadoutSceneTextboxInserts";
import LoadoutSceneOne from "./scenes/loadoutSceneOne";
import LoadoutSceneGun from "./scenes/loadoutSceneGun";
import LoadoutSceneGunMagazine from "./scenes/loadoutSceneGunMagazine";
import LoadoutSceneGunScope from "./scenes/loadoutSceneGunScope";
import LoadoutSceneClothes from "./scenes/loadoutSceneClothes";
import LoadoutSceneClothesShirt from "./scenes/loadoutSceneClothesShirt";
import LoadoutSceneClothesPants from "./scenes/loadoutSceneClothesPants";
import levelOne from "./scenes/levelOne";
import endScene from "./scenes/endScene";
import instructions from "./scenes/instructions";
//import levelOnetry from "./scenes/level1";

const DEFAULT_WIDTH = 4096;
const DEFAULT_HEIGHT = 1714;

export const CONFIG = {
    title: "My Untitled Phaser 3 Game",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [
        PreloadScene,
        MainScene,
        LoadoutSceneOne,
        LoadoutSceneTextboxInserts,
        LoadoutSceneGun,
        LoadoutSceneGunMagazine,
        LoadoutSceneGunScope,
        LoadoutSceneClothes,
        LoadoutSceneClothesPants,
        LoadoutSceneClothesShirt,
        levelOne,
        endScene,
        instructions,
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};
