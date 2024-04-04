import Phaser from "phaser";
import { CONFIG } from "./config";

window.addEventListener("load", () => {
    const game = new Phaser.Game({
        ...CONFIG,
        physics: {
            ...CONFIG.physics,
            arcade: {
                ...CONFIG.physics.arcade,
                gravity: {
                    x: 0, // Add the missing 'x' property
                    y: 200,
                },
            },
        },
    });
    console.info("Started main game:", game);
});
