import Phaser from "phaser";

export default class TextInputScene extends Phaser.Scene {
    private stateText: Phaser.GameObjects.Text;
    private inputField: HTMLInputElement;
    private inputContainer: Phaser.GameObjects.Container;
    private lvl2: boolean;
    private lvl3: boolean;
    private lvl4: boolean;
    private lvl5: boolean;

    constructor() {
        super({ key: "Level01" });
    }

    init(data: {
        lvl1: boolean;
        lvl2: boolean;
        lvl3: boolean;
        lvl4: boolean;
        lvl5: boolean;
    }) {
        this.lvl2 = data.lvl2;
        this.lvl3 = data.lvl3;
        this.lvl4 = data.lvl4;
        this.lvl5 = data.lvl5;
    }
    preload() {}

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x000);

        // this.add
        //     .image(0, 0, "Level1Background")
        //     .setOrigin(0, 0)
        //     .setDisplaySize(this.scale.width, this.scale.height);

        this.add.image(640, 100, "prompt").setDisplaySize(560, 110);
        this.add.image(155, 100, "alfredicon").setDisplaySize(130, 130);
        this.add.image(1050, 100, "pin").setDisplaySize(30, 40);

        this.inputContainer = this.add.container(360, 520);

        // Create a mask for the container
        const maskGraphics = this.make.graphics();
        maskGraphics.fillRect(300, 185, 1080, 500);
        const mask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);

        this.inputContainer.setMask(mask);

        this.addTextToContainer("Alfred: Welcome back agent09!");

        let state: string = "home";

        const lsMap = new Map<string, string>();
        const cdMap = new Map<string, string[]>();
        const cdBack = new Map<string, string>();
        const manMap = new Map<string, string>();
        const rmMap = new Map<string, string[]>(); // Map to track removable files

        lsMap.set("home", "dog cat backpack secret_folder");
        lsMap.set("backpack", "camera wrench zapgun");
        lsMap.set("dog", "dogToy");
        lsMap.set("cat", "catToy");
        lsMap.set("secret_folder", "classified_file");

        cdMap.set("home", ["dog", "cat", "backpack", "secret_folder"]);

        cdBack.set("dog", "home");
        cdBack.set("cat", "home");
        cdBack.set("backpack", "home");
        cdBack.set("secret_folder", "home");

        rmMap.set("secret_folder", ["classified_file"]);

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
        manMap.set("alfred", "Alfred: How could I be of service agent09?");

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

        this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                const newText = this.inputField.value;
                if (newText.trim() !== "") {
                    if (newText.trim() == "ls") {
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
                            state = newText.substring(3);
                            this.stateText.setText(state);
                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                        }
                        // CD DIRECTORY NOT FOUND BELOW
                        else {
                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer("Directory not found");
                        }
                    } else if (newText.substring(0, 4) == "man ") {
                        let manInput: string = newText.substring(4);

                        const manState = manMap.get(manInput);
                        if (manState !== undefined) {
                            this.inputField.value = ""; // Empty the input field
                            this.addTextToContainer("agent09: " + newText);
                            this.addTextToContainer(
                                manMap.get(manInput) as string
                            );
                        } else {
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
                                state === "secret_folder" &&
                                !files.includes("classified_file")
                            ) {
                                // Level completion logic here
                                this.addTextToContainer(
                                    "Objective complete: Classified file removed. \nGood job, agent!"
                                );
                                this.time.delayedCall(
                                    3000,
                                    this.loadLevel,
                                    [],
                                    this
                                );
                            }
                        } else {
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
                        this.inputField.value = ""; // Empty the input field
                        this.addTextToContainer("agent09: " + newText);
                        this.addTextToContainer(
                            "Command '" + newText + "' not found"
                        );
                    }
                }
            }
        });

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
            newText.setColor("red");
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
