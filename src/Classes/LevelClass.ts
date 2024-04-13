import Phaser from "phaser";

export default abstract class LevelClass extends Phaser.Scene {
    terminalInputArr: string[] = [];
    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
        this.terminalInputArr = [];
    }
}
