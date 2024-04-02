import Phaser from "phaser";

export default class LoadoutSceneClothesPants extends Phaser.Scene {
    constructor() {
        super({ key: "LoadoutSceneClothesPants" });
    }

    create() {
        this.add.image(2048, 857, "LoadoutMenu");

        // Create Menu Textboxes
        this.createClickableText(
            2950,
            250,
            "Pants:",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            3150,
            450,
            "- Overalls",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            3150,
            650,
            "- Cargo",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            3150,
            850,
            "- LOCKED",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            3150,
            1050,
            "- LOCKED",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            3150,
            1250,
            "- LOCKED",
            "#ff0000",
            "#00000000",
            () => {}
        );

        this.createClickableText(
            2950,
            1450,
            "GO BACK",
            "#ffffff",
            "#654321",
            () => {
                this.scene.start("LoadoutSceneClothes");
            }
        );
    }

    createClickableText(
        x: number,
        y: number,
        text: string,
        textColor: string,
        backdrop: string,
        onClick: () => void
    ): void {
        // Predefined style for all clickable text instances
        const style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "Arial",
            fontSize: "100px",
            color: textColor,
            align: "center",
            backgroundColor: backdrop,
        };

        const textObject = this.add.text(x, y, text, style).setInteractive();
        textObject.on("pointerdown", onClick);
    }

    update() {
        // Update logic
    }
}
