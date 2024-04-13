import Phaser from "phaser";

export default abstract class LevelClass extends Phaser.Scene {
    public terminalInputArr: string[] = [];
    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
        this.terminalInputArr = [];
    }
}
