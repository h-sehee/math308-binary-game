export class Listenters {
    constructor(scene: Phaser.Scene, eventID: string) {
        scene.events.on(eventID, () => {
            scene.terminalInputArr.push(eventID);
            this.handleCorrect();
        });
    }

}