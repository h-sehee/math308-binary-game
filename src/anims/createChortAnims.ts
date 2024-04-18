import Phaser from "phaser";

const createChortAnims = (anims: Phaser.Animations.AnimationManager) => {
    // Define animations for walking in different directions

    anims.create({
        key: "chort_walkLeft",
        frames: anims.generateFrameNumbers("chort_walk_L", {
            start: 0,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "chort_walkRight",
        frames: anims.generateFrameNumbers("chort_walk_R", {
            start: 0,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "chort_idle",
        frames: anims.generateFrameNumbers("chort_idle", {
            start: 0,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1,
    });
};
export { createChortAnims };
