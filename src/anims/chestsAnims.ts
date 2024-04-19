import Phaser from "phaser";

const createChestAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: "chest-closed",
        frames: [{ key: "chest", frame: "chests_00.png" }],
    });
    anims.create({
        key: "chest-open",
        frames: [{ key: "chest", frame: "chests_01.png" }],
    });
};

export { createChestAnims };
