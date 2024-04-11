import * as cowsay from "cowsay";
import Phaser from "phaser";
import FpsText from "../objects/fpsText";
// CODE FOR createSpeechBubbles() HEAVILY REFERENCED FROM HERE: https://github.com/phaserjs/examples/blob/master/public/src/game%20objects/text/speech%20bubble.js

export default class StartScene extends Phaser.Scene {
    fpsText: FpsText;
    // this will have a number corresponding to the speech bubble 'ID' and an object containing the speech bubble graphics to display
    bubbleData: object;
    CAT: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "StartScene" });
    }

    create() {
        // dummy data to avoid undefined error on first use of cycleDialogue()
        this.bubbleData = { bubbleNum: 0, showBubble: {} };
        // for input
        var spaceBar = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.F5);

        //
        this.input.on(
            "pointerdown",
            (
                pointer: Phaser.Input.Pointer, // we don't use the pointer param but if we don't include it it returns a pointer manager instead ugh
                objectsClicked: Phaser.GameObjects.Sprite[]
            ) => {
                console.log(objectsClicked);
                if (objectsClicked.length > 0) {
                    this.cycleDialogue(
                Object.values(this.bubbleData)[0],
                Object.values(this.bubbleData)[1]
                );
            }
        });

        // Spawn in the background and CAT image
        this.add.image(400, 300, "desktopBG");
        this.CAT = this.add.sprite(1100, 600, "CAT");

        // Make CAT clickable
        this.CAT.setInteractive();

        // Add File Sound Effects
        let lockedsfx = this.sound.add("lockedfile");

        // FILES
        // currently do nothing, should be spaced 100 pixels apart

        //Adds rectangle, does not work if above for some reason.
        const rectAnimation = this.add.graphics();
        //Create Locked Program which cannot be accessed
        const locked_prg = this.add
            .image(100, 100, "locked program")
            .setInteractive();

        locked_prg.on("pointerdown", function () {
            locked_prg.setTint(0xff6666);
            lockedsfx.play();
        });
        locked_prg.on("pointerup", function () {
            locked_prg.clearTint();
        });

        //Create Locked Text File which cannot be accessed
        const locked_txt = this.add
            .image(200, 100, "locked text")
            .setInteractive();
        locked_txt.on("pointerdown", function () {
            locked_txt.setTint(0xff6666);
            lockedsfx.play();
        });
        locked_txt.on("pointerup", function () {
            locked_txt.clearTint();
        });
        function openFile() {
            rectAnimation.fillStyle(0xffff00, 1);
            rectAnimation.fillRect(850, 20, 400, 400);
        }
        //Create Text File which CAN be accessed
        const txt1 = this.add.image(100, 200, "unlocked text").setInteractive();
        txt1.on("pointerdown", function () {
            txt1.setTint(0xaaaaff);
        });
        txt1.on("pointerup", function () {
            txt1.clearTint();
            openFile();
        });
        // SPEECH
        // switch cases are used to determine which speech bubble to display/destory
        this.cycleDialogue(
            Object.values(this.bubbleData)[0],
            Object.values(this.bubbleData)[1]
        );

        // TERMINAL (0)
        // -- Sizing constants
        const terminalWidth = 1280 / 2;
        const terminalHeight = 400;
        const terminalInputHeight = 32;
        const terminalFontSize = '1.2em';
        // -- Input
        const terminalInput = document.createElement('input');
        terminalInput.type = 'text';
        terminalInput.style.outline = 'none';
        terminalInput.style.border = 'none';
        terminalInput.style.width = `${terminalWidth - 8}px`;
        terminalInput.style.height = `${terminalInputHeight}px`;
        terminalInput.style.padding = '0px';
        terminalInput.style.margin = '0px';
        terminalInput.style.backgroundColor = '#0000';
        terminalInput.style.color = '#fff';
        terminalInput.className = 'jetbrains-mono-normal';
        terminalInput.style.backgroundImage = 'url("assets/img/terminal prompt.png")';
        terminalInput.style.backgroundPosition = '8px 8px';
        terminalInput.style.backgroundRepeat = 'no-repeat';
        terminalInput.style.backgroundSize = '16px';
        terminalInput.style.paddingLeft = '28px';
        terminalInput.style.fontSize = terminalFontSize;
        this.game.canvas.parentNode?.appendChild(terminalInput);
        terminalInput.addEventListener('change', () => {
            this.parseCommand(terminalInput.value);
            terminalInput.value = '';
        });
        // -- Text
        const terminalHistoryParent = document.createElement('div');
        terminalHistoryParent.style.width = `${terminalWidth - 8}px`;
        terminalHistoryParent.style.height = `${terminalHeight - terminalInputHeight}px`;
        terminalHistoryParent.style.padding = '0px';
        terminalHistoryParent.style.margin = '0px';
        terminalHistoryParent.style.backgroundColor = '#0000';
        terminalHistoryParent.style.color = '#fff';
        terminalHistoryParent.className = 'jetbrains-mono-normal';
        terminalHistoryParent.style.fontSize = terminalFontSize;
        terminalHistoryParent.style.display = 'inline';
        terminalHistoryParent.innerHTML = '<p id="terminal-history" style="white-space: pre-wrap"></p>';
        // -- Background
        this.add.rectangle(terminalWidth / 2 + 8, 720 - terminalHeight / 2, terminalWidth + 16, terminalHeight, 0x000000, 0x40);
        this.add.dom(terminalWidth / 2 + 22, 720 - terminalHeight / 2, terminalHistoryParent);
        this.add.dom(terminalWidth / 2 + 8, 720 - terminalInputHeight / 2, terminalInput);
    }

    // for opening file animation
    // for controlling when speech bubbles spawn
    cycleDialogue(bubbleNum: number, showBubble: object) {
        console.log(bubbleNum);
        // if showBubble isn't empty, destroy the old speech bubble
        if (JSON.stringify(showBubble) != "{}") {
            // destroy tbe old speech bubble assets
            Object.values(showBubble)[0].destroy();
            Object.values(showBubble)[1].destroy();
        }
        // switch cases for dialogue
        switch (bubbleNum) {
            case 0:
                showBubble = this.createSpeechBubble(
                    1060,
                    400,
                    200,
                    100,
                    "woagh !!!! so silly"
                );
                // make the white bubble graphic visible
                Object.values(showBubble)[0].visible = true;
                // make the text object visible
                Object.values(showBubble)[1].visible = true;
                break;
            case 1:
                showBubble = this.createSpeechBubble(
                    1060,
                    400,
                    200,
                    100,
                    "nice space button press :3"
                );
                // make the white bubble graphic visible
                Object.values(showBubble)[0].visible = true;
                // make the text object visible
                Object.values(showBubble)[1].visible = true;
                break;
            case 2:
                showBubble = this.createSpeechBubble(
                    1060,
                    400,
                    200,
                    100,
                    "Where'd you get it? The space bar store ???"
                );
                // make the white bubble graphic visible
                Object.values(showBubble)[0].visible = true;
                // make the text object visible
                Object.values(showBubble)[1].visible = true;
                break;
        }
        bubbleNum = bubbleNum + 1;
        this.bubbleData = { bubbleNum, showBubble };
    }

    // for making the speech bubble graphics
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

        // hide them, they'll get made visible in cycleDialogue()
        // this function is just to make the speech bubble graphic and text object we need to display later
        content.visible = false;
        bubble.visible = false;

        return { bubble, content };
    }

    parseCommand(text: string) {
        if (text.length === 0) {
            return;
        }

        const terminalHistory = document.getElementById('terminal-history');
        if (!terminalHistory) {
            return;
        }

        text = text.trim();
        const command = text.split(' ')[0];
        switch (command) {
            case 'echo': {
                // todo: need to move command code to different functions, they're fine here for now
                terminalHistory.innerText = text.substring(4).trim();
                return;
            }
            case 'cowsay': {
                terminalHistory.innerText = cowsay.say({
                    text: text.substring(6).trim(),
                    //f: 'kitty',
                });
                return;
            }
            default: {
                terminalHistory.innerText = 'Unknown command.';
                return;
            }
        }
    }

    update() {
        //this.fpsText.update();
    }
}
