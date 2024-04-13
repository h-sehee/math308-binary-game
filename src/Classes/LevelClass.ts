import Phaser from "phaser";

export default abstract class LevelClass extends Phaser.Scene {
    public terminalInputArr: string[] = [];
    public CorrectTerminalArr: string[] = [];
    public FeedbackText?: Phaser.GameObjects.Text;

    public setFeedbackText(text: Phaser.GameObjects.Text) {
        this.FeedbackText = text;
    }
    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config);
        this.terminalInputArr = [];
    }
}
