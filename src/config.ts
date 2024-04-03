import Phaser from "phaser";
import TitleScene from "./scenes/titleScene";
import PreloadScene from "./scenes/preloadScene";
import TerminalScene from "./scenes/terminalScene";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "Cyber Spy",
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
    scene: [PreloadScene, TitleScene, TerminalScene],
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
