import Phaser from "phaser";

const createWeaponsAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: "sword_attack",
        frames: anims.generateFrameNames("swordSlash", {
            start: 13,
            end: 18,
            prefix: "Classic_",
            suffix: ".png",
        }),
        frameRate: 15,
    });

    anims.create({
        key: "bow_attack",
        frames: anims.generateFrameNames("bow", {
            start: 1,
            end: 8,
            prefix: "Bow-",
            suffix: ".png",
        }),
        frameRate: 20,
    });
};

export { createWeaponsAnims };
