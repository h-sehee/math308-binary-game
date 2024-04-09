import Phaser from "phaser";

export default class TextInputScene extends Phaser.Scene {
    private stateText: Phaser.GameObjects.Text;
    private inputField: HTMLInputElement;
    private inputContainer: Phaser.GameObjects.Container;
    private timer: Phaser.GameObjects.Text;
    private lvl2: boolean;
    private lvl3: boolean;
    private lvl4: boolean;
    private username: string;
    private lvl5: boolean;

    constructor() {
        super({ key: "Level01" });
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
    preload() {}

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x000);

        this.add.image(640, 100, "prompt").setDisplaySize(560, 110);
        this.add.image(155, 100, "alfredicon").setDisplaySize(130, 130);
        this.add.image(1050, 100, "pin").setDisplaySize(30, 40);

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

        let state: string = "home";

        const lsMap = new Map<string, string>();
        const cdMap = new Map<string, string[]>();
        const cdBack = new Map<string, string>();
        const manMap = new Map<string, string>();
        const rmMap = new Map<string, string[]>(); // Map to track removable files

        lsMap.set("home", "break_room closet control_room");
        lsMap.set("break_room", "suitcase vending_machine chair table");
        lsMap.set("closet", "cardboard_box wires hazmat_suit");
        lsMap.set("control_room", "surveillance_camera monitor apple_juice");
        lsMap.set("suitcase", "namuhs_glasses batteries papers apple");
        lsMap.set("cardboard_box", "papers");

        cdMap.set("home", ["break_room", "closet", "control_room"]);
        cdMap.set("break_room", ["suitcase"]);
        cdMap.set("closet", ["cardboard_box"]);

        cdBack.set("break_room", "home");
        cdBack.set("closet", "home");
        cdBack.set("control_room", "home");
        cdBack.set("suitcase", "break_room");
        cdBack.set("cardboard_box", "closet");

        rmMap.set("control_room", ["surveillance_camera"]);

        manMap.set(
            "ls",
            "Alfred: Remember, the 'ls' command\nis useful for viewing your surroundings."
        );
        manMap.set(
            "rm",
            "Alfred: Remember, the 'rm' command\nneutralizes enemy files."
        );
        manMap.set(
            "cd",
            "Alfred: Do recall, the 'cd' command\npermits you to navigate through rooms and items."
        );
        manMap.set(
            "alfred",
            "Alfred: Try using the 'cd' command to traverse through\ndifferent areas. Then use 'rm' to remove critical files."
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

        this.inputField.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(this.inputField);

        this.add.text(
            410,
            59,
            "Enter the 'control_room' and remove the \n'surveillance_camera' so you can proceed\ninto the next area. Namuh has security\nroaming the area so time is of the essence.",
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
                const newText = this.inputField.value;
                if (newText.trim() !== "") {
                    if (newText.trim() == "ls") {
                        lsDing.play();
                        this.inputField.value = ""; // Empty the input field
                        this.addTextToContainer("agent09: " + newText);
                        this.addTextToContainer(lsMap.get(state) as string);
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
                    } else if (newText.substring(0, 3) == "rm ") {
                        let rmInput: string = newText.substring(3);
                        if (rmMap.get(state)?.includes(rmInput)) {
                            // Remove the file from the listing and update the map
                            let files = lsMap.get(state) || "";
                            files = files
                                .replace(rmInput, "")
                                .trim()
                                .replace(/\s{2,}/g, " "); // Remove the file and extra spaces
                            lsMap.set(state, files);

                            // Optionally, remove the file from the rmMap if you want to prevent further references
                            // rmMap.get(state)?.splice(rmMap.get(state)?.indexOf(rmInput), 1);

                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer(
                                "File '" + rmInput + "' removed successfully."
                            );

                            // Check if the level's objective is achieved, e.g., if all required files are removed
                            if (
                                state === "control_room" &&
                                !files.includes("surveillance_camera")
                            ) {
                                // Level completion logic here
                                this.addTextToContainer(
                                    "Objective complete: Classified file removed. \nGood work, agent09!"
                                );
                                this.time.delayedCall(
                                    3000,
                                    this.loadLevel,
                                    [],
                                    this
                                );
                            }
                        } else {
                            ding.play();

                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer(
                                "File '" +
                                    rmInput +
                                    "' cannot be found or removed."
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
        });

        let time = 30;

        this.timer = this.add.text(75, 655, time.toString(), {
            fontSize: "50px",
            color: "red",
        });

        const updateTimer = () => {
            this.timer.setText(time.toString());

            if (time > 0) {
                this.time.delayedCall(1000, updateTimer);
            }
            time--;

            if (time == 0) {
                this.scene.start("LevelSelect", {
                    lvl2: false,
                    lvl3: this.lvl3,
                    lvl4: this.lvl4,
                });
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

    addTextToContainer(text: string) {
        // Create a text object for the provided string
        const newText = this.add.text(0, 0, text, {
            fontSize: "24px",
            color: "#fff",
        });

        if (!text.includes("\n")) {
            this.inputContainer.y -= 24.7;
        } else {
            this.inputContainer.y -= 49.3;
        }

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
            lvl2: true,
            lvl3: this.lvl3,
            lvl4: this.lvl4,
            lvl5: this.lvl5,
        });
    }
}
