//import Phaser from 'phaser';
import LevelClass from '../Classes/LevelClass';

export class Listenter {
    constructor(scene: LevelClass, eventID: string) {
        scene.events.on(eventID, () => {
            scene.terminalInputArr.push(eventID);
            scene.events.emit("check_terminal_input");
        });
    }

}