import Phaser from "phaser";
import { sceneEvents } from "../events/eventsCenter";

export default class GameUI extends Phaser.Scene {
    private hp: number;
    private threads: number;
    private weaponType: string;

    private hearts: Phaser.GameObjects.Group;
    private weaponBox: Phaser.GameObjects.Image;
    private sword: Phaser.GameObjects.Image;
    private bow: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "game-ui" });
    }

    init(data: { hp: number; threads: number; weaponType: string }) {
        this.hp = data.hp;
        this.threads = data.threads;
        this.weaponType = data.weaponType;
    }

    create() {
        this.hearts = this.add.group({ classType: Phaser.GameObjects.Image });
        this.hearts.createMultiple({
            key: "heart-full",
            setXY: {
                x: 30,
                y: 30,
                stepX: 16,
            },
            quantity: 3,
        });

        if (this.hp < 3) {
            this.hearts.children.each((go, idx) => {
                const heart = go as Phaser.GameObjects.Image;
                if (idx < this.hp) {
                    heart.setTexture("heart-full");
                } else {
                    heart.setTexture("heart-empty");
                }
                return true;
            });
        }

        this.add.image(30, 50, "threads");
        this.add.text(40, 41, `${this.threads}`, {
            fontSize: "12px",
            fontFamily: "Academy Engraved LET",
            strokeThickness: 2,
            stroke: "0xffffff",
        });

        this.weaponBox = this.add.image(
            this.cameras.main.width - 40,
            38,
            "weaponBox"
        );
        this.weaponBox.setScale(0.01, 0.01);
        this.sword = this.add.image(this.cameras.main.width - 40, 38, "sword");
        this.bow = this.add.sprite(
            this.cameras.main.width - 38,
            39,
            "bow",
            "Bow-1.png"
        );
        if (this.weaponType === "sword") {
            this.sword.setVisible(true);
            this.bow.setVisible(false);
        } else if (this.weaponType === "bow") {
            this.bow.setVisible(true);
            this.sword.setVisible(false);
        }

        sceneEvents.on(
            "player-health-changed",
            this.handlePlayerHealthChanged,
            this
        );

        sceneEvents.on(
            "player-weapon-changed",
            this.handlePlayerWeaponChanged,
            this
        );
    }

    private handlePlayerHealthChanged(health: number) {
        this.hearts.children.each((go, idx) => {
            const heart = go as Phaser.GameObjects.Image;
            if (idx < health) {
                heart.setTexture("heart-full");
            } else {
                heart.setTexture("heart-empty");
            }
            return true;
        });
    }

    private handlePlayerWeaponChanged(weaponType: string) {
        if (weaponType === "sword") {
            this.sword.setVisible(true);
            this.bow.setVisible(false);
        } else if (weaponType === "bow") {
            this.bow.setVisible(true);
            this.sword.setVisible(false);
        }
    }
}
