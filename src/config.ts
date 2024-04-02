import Phaser from "phaser";
import FCFSShift from "./scenes/fcfsShift";
import PreloadScene from "./scenes/preloadScene";
import MainMenu from "./scenes/mainMenu";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "Schedulsine",
    version: "alpha",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [PreloadScene, MainMenu, FCFSShift],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
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
        pixelArt: true,
        antialias: true,
    },
};
