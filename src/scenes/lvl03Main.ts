import Phaser from "phaser";

export default class Level03 extends Phaser.Scene {
    private stateText: Phaser.GameObjects.Text;
    private inputField: HTMLInputElement;
    private inputContainer: Phaser.GameObjects.Container;
    private timer: Phaser.GameObjects.Text;
    private lvl2: boolean;
    private lvl3: boolean;
    private lvl4: boolean;
    private username: string;
    private lvl5: boolean;
    private objectiveCompleted: boolean = false;
    private lastText: string[] = [""];
    private lastPosition: number = -1;

    constructor() {
        super({ key: "Level03" });
    }

    init(data: {
        username: string;

        lvl1: boolean;

        lvl2: boolean;

        lvl3: boolean;

        lvl4: boolean;

        lvl5: boolean;
    }) {
        this.lvl2 = data.lvl2;
        this.lvl3 = data.lvl3;
        this.lvl4 = data.lvl4;
        this.username = data.username;
        this.lvl5 = data.lvl5;
    }
    preload() {
        this.load.image("1", "assets/num1.png");
        this.load.image("2", "assets/num2.png");
        this.load.image("3", "assets/num3.png");
        this.load.image("4", "assets/num4.png");
        this.load.image("5", "assets/num5.png");
        this.load.image("6", "assets/num6.png");
        this.load.image("7", "assets/num7.png");
        this.load.image("8", "assets/num8.png");
        this.load.image("9", "assets/num9.png");
        this.load.image("0", "assets/num0.png");
        this.load.image("padCheck", "assets/padCheck.png");
        this.load.image("padX", "assets/padx.png");
        this.load.image("pinPadText", "assets/PinPadText.png");
    }

    create() {
        this.objectiveCompleted = false;
        this.add.rectangle(640, 360, 1280, 720, 0x000);

        this.add.image(640, 100, "prompt").setDisplaySize(560, 110);
        this.add.image(155, 100, "alfredicon").setDisplaySize(130, 130);
        this.add.image(1050, 100, "pin").setDisplaySize(30, 40);

        function getRandomInt(min: number, max: number): number {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const randomNum1 = getRandomInt(1, 9).toString();
        const randomNum2 = getRandomInt(1, 9).toString();
        const randomNum3 = getRandomInt(1, 9).toString();
        const randomNum4 = getRandomInt(1, 9).toString();

        //Padlock code
        const imagePositions = [
            { x: 1040, y: 310, key: "1" },
            { x: 1110, y: 310, key: "2" },
            { x: 1180, y: 310, key: "3" },
            { x: 1040, y: 380, key: "4" },
            { x: 1110, y: 380, key: "5" },
            { x: 1180, y: 380, key: "6" },
            { x: 1040, y: 450, key: "7" },
            { x: 1110, y: 450, key: "8" },
            { x: 1180, y: 450, key: "9" },
            { x: 1040, y: 520, key: "padX" },
            { x: 1110, y: 520, key: "0" },
            { x: 1180, y: 520, key: "padCheck" },
        ];

        const hoverTintColor = 0xd3d3d3;
        const answer = randomNum1 + randomNum2 + randomNum3 + randomNum4;

        const displayScreen = this.add
            .text(1065, 207, "", {
                fontSize: "55px",
                fontFamily: "Arial",
                color: "#ffff00",
            })
            .setDepth(1);
        this.add
            .image(1109, 239, "pinPadText")
            .setDisplaySize(240, 80)
            .setDepth(0);
        //padlock hover tint code
        imagePositions.forEach((pos) => {
            const image = this.add
                .image(pos.x, pos.y, pos.key)
                .setDisplaySize(70, 70);

            image.setInteractive();

            image.on("pointerover", () => {
                image.setTint(hoverTintColor);
            });

            image.on("pointerout", () => {
                image.clearTint();
            });

            image.on("pointerdown", () => {
                if (pos.key !== "padX" && pos.key !== "padCheck") {
                    if (displayScreen.text.length < 4) {
                        displayScreen.text += pos.key;
                    }
                } else if (pos.key === "padX") {
                    // Handle backspace functionality
                    displayScreen.text = displayScreen.text.slice(0, -1);
                } else {
                    if (displayScreen.text === answer) {
                        this.objectiveCompleted = true;
                        this.addTextToContainer("Access Granted");
                        this.time.delayedCall(2000, () => {
                            this.scene.start("LevelSelect");
                        });
                    } else {
                        this.addTextToContainer("Access denied.");
                    }
                }
            });
        });

        let ding = this.sound.add("ding", { loop: false });
        let lsDing = this.sound.add("lsDing", { loop: false });
        let cdDing = this.sound.add("cdDing", { loop: false });
        let cdBackDing = this.sound.add("cdBackDing", { loop: false });
        let manDing = this.sound.add("manDing", { loop: false });

        this.inputContainer = this.add.container(360, 520);

        const maskGraphics = this.make.graphics();
        maskGraphics.fillRect(300, 185, 1080, 500);
        const mask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);

        this.inputContainer.setMask(mask);

        this.addTextToContainer("Alfred: Welcome back " + this.username + "!");

        let state: string = "back_door";

        const lsMap = new Map<string, string>();
        const catMap = new Map<string, string>();
        const cdMap = new Map<string, string[]>();
        const cdBack = new Map<string, string>();
        const manMap = new Map<string, string>();

        lsMap.set("back_door", "dir_brick_pile dir_garbage_can dir_file_box");
        lsMap.set("brick_pile", "file_bricks file_rocks file_dirt");
        lsMap.set(
            "garbage_can",
            "file_soda_can file_sticks dir_cracked_phone file_broken_chair"
        );
        lsMap.set(
            "file_box",
            "file_pencils dir_secret_folder_#1 dir_graph_paper"
        );
        lsMap.set("cracked_phone", "dir_notes_app");
        lsMap.set("graph_paper", "file_code_#4.txt");
        lsMap.set("notes_app", "file_code_#1.txt");
        lsMap.set("secret_folder_#1", "file_code_#2.txt file_code_#3.txt");

        catMap.set("code_#1.txt", randomNum1);
        catMap.set("code_#2.txt", randomNum2);
        catMap.set("code_#3.txt", randomNum3);
        catMap.set("code_#4.txt", randomNum4);

        catMap.set("bricks.txt", "bricks");
        catMap.set("rocks.txt", "rocks");
        catMap.set("dirt.txt", "dirt");
        catMap.set("pencils.txt", "pencils");
        catMap.set("soda_can.txt", "soda_can");
        catMap.set("sticks.txt", "sticks");
        catMap.set("broken_chair.txt", "broken_chair");

        cdMap.set("back_door", ["brick_pile", "garbage_can", "file_box"]);
        cdMap.set("garbage_can", ["cracked_phone"]);
        cdMap.set("file_box", ["secret_folder_#1", "graph_paper"]);
        cdMap.set("cracked_phone", ["notes_app"]);

        cdBack.set("brick_pile", "back_door");
        cdBack.set("garbage_can", "back_door");
        cdBack.set("file_box", "back_door");
        cdBack.set("cracked_phone", "garbage_can");
        cdBack.set("graph_paper", "file_box");
        cdBack.set("notes_app", "cracked_phone");
        cdBack.set("secret_folder_#1", "file_box");

        manMap.set(
            "ls",
            "Alfred: Remember, the 'ls' command\nis useful for viewing your surroundings."
        );
        manMap.set(
            "cd",
            "Alfred: Do recall, the 'cd' command\npermits you to navigate through rooms and items."
        );
        manMap.set(
            "alfred",
            "Alfred: Try using the 'cd' to look\nfor directories labeled secret_folder. Remember,\norder is important when typing in the on the pin-pad."
        );
        manMap.set(
            "cat",
            "Alfred: The 'cat' command permits you\nto read a file's contents. Kind of like\nthe 'ls' command reads a directory's contents."
        );

        // Add text input field
        this.inputField = document.createElement("input");
        this.inputField.type = "text";
        this.inputField.style.position = "absolute";
        this.inputField.style.width = "600px";
        this.inputField.style.height = "40px";
        this.inputField.style.fontSize = "20px";
        this.inputField.style.top = "80%";
        this.inputField.style.left = "50%";
        this.inputField.style.backgroundColor = "#000"; // Change background color to white
        this.inputField.style.color = "#fff"; // Change text color to black
        this.inputField.placeholder = ">$"; // Placeholder text
        this.inputField.style.border = "2px solid gold";

        this.inputField.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(this.inputField);

        this.add.text(
            410,
            59,
            "Search directories for codes \nand type them into the pin-pad\nto advance further into the facility.",
            {
                color: "#fff",
                fontSize: "17px",
                fontFamily: "Monospace",
            }
        );

        this.input.keyboard?.removeCapture(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                this.lastPosition = -1;
                const newText = this.inputField.value;
                if (newText.trim() !== "") {
                    if (newText.trim() == "ls") {
                        lsDing.play();
                        this.inputField.value = ""; // Empty the input field
                        this.addTextToContainer(
                            this.username.toLowerCase().replace(/\s+/g, "_") +
                                ": " +
                                newText
                        );
                        this.addLsToContainer(lsMap.get(state) as string);
                    } else if (newText.substring(0, 4) == "cat ") {
                        let catInput: string = newText.substring(4);
                        const catState = catMap.get(catInput);
                        if (catState !== undefined) {
                            lsDing.play();
                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer(catState);
                        } else {
                            ding.play();
                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer(
                                "File '" + catInput + "' not found"
                            );
                        }
                    } else if (newText.substring(0, 3) == "cd ") {
                        let cdInput: string = newText.substring(
                            3,
                            newText.length
                        );
                        // CD .. FUNCTIONALITY BELOW
                        const backState = cdBack.get(state);
                        const cdState = cdMap.get(state);
                        if (backState !== undefined && cdInput == "..") {
                            cdBackDing.play();

                            state = backState;
                            this.stateText.setText(state);
                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                        }
                        // CD FUNCTIONALITY BELOW
                        else if (
                            cdState !== undefined &&
                            cdMap.get(state)?.includes(cdInput)
                        ) {
                            cdDing.play();

                            state = newText.substring(3);
                            this.stateText.setText(state);
                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                        }
                        // CD DIRECTORY NOT FOUND BELOW
                        else {
                            ding.play();

                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer("Directory not found");
                        }
                        // MAN INPUT BELOW
                    } else if (newText.substring(0, 4) == "man ") {
                        let manInput: string = newText.substring(4);

                        const manState = manMap.get(manInput);
                        if (manState !== undefined) {
                            manDing.play();
                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer(
                                manMap.get(manInput) as string
                            );
                        } else {
                            ding.play();

                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer(
                                "Command '" + manInput + "' not found"
                            );
                        }
                    }
                    // NONSENSE INPUT BELOW
                    else {
                        ding.play();
                        this.inputField.value = ""; // Empty the input field
                        this.addTextToContainer("agent09: " + newText);
                        this.addTextToContainer(
                            "Command '" + newText + "' not found"
                        );
                    }
                }
            }
            if (event.key === "ArrowUp") {
                let index = this.lastText.length + this.lastPosition;
                if (index > 0) {
                    this.inputField.value = this.lastText[index];
                    this.lastPosition -= 1;
                }
            }
            if (event.key === "ArrowDown") {
                let index = this.lastText.length + this.lastPosition;
                if (index < this.lastText.length - 2) {
                    this.inputField.value = this.lastText[index + 2];
                    this.lastPosition += 1;
                }
            }
        });

        let time = 120;
        let lastUpdateTime = Date.now();

        this.timer = this.add.text(75, 655, time.toFixed(2), {
            fontSize: "50px",
            color: "red",
        });

        const updateTimer = () => {
            if (!this.objectiveCompleted) {
                const currentTime = Date.now();
                const elapsedTime = currentTime - lastUpdateTime;

                time -= elapsedTime / 1000; // Adjust time based on elapsed time in seconds
                lastUpdateTime = currentTime; // Update the last update time

                if (time > 0) {
                    this.timer.setText(time.toFixed(2)); // Update the timer text
                    this.time.delayedCall(10, updateTimer);
                } else {
                    this.timer.setText("0.00");
                    this.scene.start("SecurityBreachScene", {
                        username: this.username,
                        lvl2: this.lvl2,
                        lvl3: this.lvl3,
                        lvl4: this.lvl4,
                    });
                }
            }
        };

        updateTimer();

        this.stateText = this.add.text(1075, 95, state, {
            fontSize: "24px",
            color: "#fff",
        });
        this.events.on("shutdown", this.removeInputField, this);
    }
    removeInputField() {
        if (this.inputField.parentElement) {
            this.inputField.parentElement.removeChild(this.inputField);
        }
    }
    update() {}

    addLsToContainer(text: string) {
        const words = text.split(" ");

        const numNewlines = words.length;

        this.inputContainer.y -= numNewlines * 24.7;

        for (let word of words) {
            if (word.substring(0, 5) === "file_") {
                let newWord = word.substring(5);
                const newText = this.add.text(0, 0, newWord, {
                    fontSize: "24px",
                    color: "#77C3EC",
                });
                this.inputContainer.add(newText);
            } else if (word.substring(0, 4) === "dir_") {
                let newWord = word.substring(4);
                const newText = this.add.text(0, 0, newWord, {
                    fontSize: "24px",
                    color: "#86DC3D",
                });
                this.inputContainer.add(newText);
            } else {
                const newText = this.add.text(0, 0, word, {
                    fontSize: "24px",
                    color: "#fff",
                });
                this.inputContainer.add(newText);
            }

            this.repositionTextObjects();
        }
    }

    addTextToContainer(text: string) {
        const newText = this.add.text(0, 0, text, {
            fontSize: "24px",
            color: "#fff",
        });

        const numNewlines = (text.match(/\n/g) || []).length + 1;

        // Adjust y position based on the number of newline characters
        this.inputContainer.y -= numNewlines * 24.7;

        if (text.includes("Alfred: ")) {
            newText.setColor("gold");
        }
        if (text.includes("Objective complete: ")) {
            newText.setColor("lime");
        }

        // Add the new text object to the container
        this.inputContainer.add(newText);

        // Reposition text objects vertically within the container
        this.repositionTextObjects();
    }

    repositionTextObjects() {
        let yPos = 0;

        // Loop through all text objects in the container and position them vertically
        this.inputContainer.iterate((child: Phaser.GameObjects.GameObject) => {
            if (child instanceof Phaser.GameObjects.Text) {
                child.y = yPos;
                yPos += child.height;
            }
        });
    }

    loadLevel() {
        this.removeInputField();
        this.scene.start("LevelSelect", {
            username: this.username,
            lvl2: true,
            lvl3: this.lvl3,
            lvl4: this.lvl4,
            lvl5: this.lvl5,
        });
    }
}
