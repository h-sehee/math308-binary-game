import Phaser from "phaser";
import FpsText from "../objects/fpsText";
// CODE FOR createSpeechBubbles() HEAVILY REFERENCED FROM HERE: https://github.com/phaserjs/examples/blob/master/public/src/game%20objects/text/speech%20bubble.js

export default class StartScene extends Phaser.Scene {
    fpsText: FpsText;

    constructor() {
        super({ key: "StartScene" });
    }

    create() {
        this.add.image(400, 300, "desktopBG");
        this.add.image(1100, 600, "CAT");
        // FILES
        // currently do nothing, should be spaced 100 pixels apart
        this.add.image(100, 100, "locked program");
        this.add.image(200, 100, "locked text");
        this.add.image(100, 200, "unlocked text");
        // SPEECH
        // bubbleCounter is like an ID for the speech bubble
        // switch cases are used to determine which speech bubble to display/destory
        let bubbleCounter = 0;
        bubbleCounter = this.cycleDialogue(bubbleCounter);
        console.log(bubbleCounter);
    }
    // for controlling when speech bubbles spawn
    // TODO: figure out a way to despawn bubbles after next bubble is spawned
    // add timers for bubbles to despawn and make new cases unreachable numbers to display bubbles after X event
    cycleDialogue(bubbleNum: number) {
        console.log(bubbleNum);
        switch (bubbleNum) {
            case 0:
                this.createSpeechBubble(
                    1060,
                    400,
                    200,
                    100,
                    "woagh !!!! so silly"
                );
                break;
            case 1:
                this.createSpeechBubble(
                    1060,
                    500,
                    200,
                    100,
                    "nice enter button press :3"
                );
                break;
        }
        return bubbleNum + 1;
    }
    // for making the speech bubbles
    createSpeechBubble(
        x: number,
        y: number,
        width: number,
        height: number,
        quote: string
    ) {
        const bubbleWidth = width;
        const bubbleHeight = height;
        const bubblePadding = 10;
        const arrowHeight = bubbleHeight / 4;

        const bubble = this.add.graphics({ x: x, y: y });

        //  Bubble shadow
        bubble.fillStyle(0x222222, 0.5);
        bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

        //  Bubble color
        bubble.fillStyle(0xffffff, 1);

        //  Bubble outline line style
        bubble.lineStyle(4, 0x565656, 1);

        //  Bubble shape and outline
        bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
        bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

        //  Calculate arrow coordinates
        const point1X = Math.floor(bubbleWidth / 7);
        const point1Y = bubbleHeight;
        const point2X = Math.floor((bubbleWidth / 7) * 2);
        const point2Y = bubbleHeight;
        const point3X = Math.floor(bubbleWidth / 7);
        const point3Y = Math.floor(bubbleHeight + arrowHeight);

        //  Bubble arrow shadow
        bubble.lineStyle(4, 0x222222, 0.5);
        bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

        //  Bubble arrow fill
        bubble.fillTriangle(
            point1X,
            point1Y,
            point2X,
            point2Y,
            point3X,
            point3Y
        );
        bubble.lineStyle(2, 0x565656, 1);
        bubble.lineBetween(point2X, point2Y, point3X, point3Y);
        bubble.lineBetween(point1X, point1Y, point3X, point3Y);

        const content = this.add.text(0, 0, quote, {
            fontFamily: "Arial",
            fontSize: 20,
            color: "#000000",
            align: "center",
            wordWrap: { width: bubbleWidth - bubblePadding * 2 },
        });

        const b = content.getBounds();

        content.setPosition(
            bubble.x + bubbleWidth / 2 - b.width / 2,
            bubble.y + bubbleHeight / 2 - b.height / 2
        );
    }

    update() {
        //this.fpsText.update();
        //this.input.keyboard?.on('keydown_ENTER', this.cycleDialogue(bubbleCounter), this)
        //this.input.keyboard.on('keydown_ENTER', this.cycleDialogue(1));
    }
}
