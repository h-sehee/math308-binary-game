import Phaser from "phaser";

declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            bow(
                x: number,
                y: number,
                texture: string,
                frame?: string | number
            ): Bow;
        }
    }
}

export default class Bow extends Phaser.Physics.Arcade.Sprite {
    private _damage: number;

    get damage() {
        return this._damage;
    }

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
        this._damage = 3;
    }

    handleArrow(angle: number) {
        const arrow = this.scene.physics.add.image(this.x, this.y, "arrow");

        arrow.body.setSize(arrow.width * 1.5, arrow.height * 1.5);
        arrow.setScale(-1, -1);

        this.scene.events.emit("arrowCreated", arrow);

        this.anims.play("bow_attack", true);

        arrow.setScale(0.3);
        arrow.setRotation(angle - Math.PI / 4);

        this.scene.physics.moveTo(
            arrow,
            this.scene.input.x,
            this.scene.input.y,
            200
        );

        this.scene.events.on(
            "arrowHit",
            (arrow: Phaser.Types.Physics.Arcade.ImageWithDynamicBody) => {
                arrow.destroy();
            }
        );
    }

    update() {}
}

Phaser.GameObjects.GameObjectFactory.register(
    "bow",
    function (
        this: Phaser.GameObjects.GameObjectFactory,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        var sprite = new Bow(this.scene, x, y, texture, frame);

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(
            sprite,
            Phaser.Physics.Arcade.DYNAMIC_BODY
        );

        sprite.setScale(0.5);
        sprite.setOrigin(0.5, 0.5);

        return sprite;
    }
);
