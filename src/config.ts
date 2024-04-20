import Phaser from "phaser";
import MainScene from "./scenes/mainScene";
import PreloadScene from "./scenes/preloadScene";
import ItemScreen from "./scenes/itemScreen";
import ItemList from "./scenes/itemList";
import Narration from "./scenes/narration";
import Unlock from "./scenes/unlock";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "My Untitled Phaser 3 Game",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    dom: {
        createContainer: true,
    },
    scene: [PreloadScene, MainScene, Narration, Unlock, ItemList, ItemScreen],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
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
