import Phaser from "phaser";

declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            sword(
                x: number,
                y: number,
                texture: string,
                frame?: string | number
            ): Sword;
        }
    }
}

export default class Sword extends Phaser.Physics.Arcade.Sprite {
    private swordslash?: Phaser.Physics.Arcade.Sprite;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
    }

    handleSwordSlash(angle: number) {
        const swordSlash = this.scene.physics.add.sprite(
            this.x,
            this.y,
            "swordSlash",
            "Classic_13.png"
        );

        swordSlash.body.setSize(
            swordSlash.width * 0.4,
            swordSlash.height * 0.4
        );

        this.scene.events.emit("swordSlashCreated", swordSlash);

        swordSlash.setScale(0.3);
        swordSlash.setRotation(angle - Math.PI / 4);
        swordSlash.anims.play("sword_attack", true);

        swordSlash.on(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            () => {
                swordSlash.destroy();
            },
            this
        );

        this.scene.physics.moveTo(
            swordSlash,
            this.scene.input.x,
            this.scene.input.y,
            200
        );

        this.scene.events.on(
            "swordSlashHit",
            (swordSlash: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
                swordSlash.destroy();
            }
        );
    }

    update() {}
}

Phaser.GameObjects.GameObjectFactory.register(
    "sword",
    function (
        this: Phaser.GameObjects.GameObjectFactory,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        var sprite = new Sword(this.scene, x, y, texture, frame);

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(
            sprite,
            Phaser.Physics.Arcade.DYNAMIC_BODY
        );

        sprite.setScale(0.5);
        sprite.setOrigin(0, 1);

        return sprite;
    }
);
