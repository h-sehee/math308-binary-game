import Phaser from "phaser";
import TerminalButton from "./terminalButton";
export class ButtonAndListensers {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        buttonNames: string[]
    ) {
        const SCENE_KEY = scene.scene.key;

        buttonNames.map((buttonName, index) => {
            new TerminalButton(
                scene,
                x + index * 300,
                y,
                texture,
                buttonName,
                `${SCENE_KEY}_${buttonName}`
            );
        });
    }
}
