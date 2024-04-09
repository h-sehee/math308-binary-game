import Phaser from "phaser";
import TitleScene from "./scenes/titleScene";
import PreloadScene from "./scenes/preloadScene";
import TerminalScene from "./scenes/terminalScene";
import LevelSelect from "./scenes/levelSelect";
import Level01 from "./scenes/level01";
import LoadingScene1 from "./scenes/level01_load";
import IntroScene from "./scenes/intro";
import LoginScene from "./scenes/login";

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
    scene: [
        PreloadScene,
        TitleScene,
        LevelSelect,
        TerminalScene,
        Level01,
        LoadingScene1,
        IntroScene,
        LoginScene,
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
