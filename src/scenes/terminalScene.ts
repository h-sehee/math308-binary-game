import Phaser from "phaser";

export default class TextInputScene extends Phaser.Scene {
    private inputText: Phaser.GameObjects.Text;

    private stateText: Phaser.GameObjects.Text;

    private inputField: HTMLInputElement;

    constructor() {
        super({ key: "TerminalScene" });
    }

    preload() {}

    create() {
        let state: string = "home";

        const lsMap = new Map<string, string>();
        const cdMap = new Map<string, string[]>();
        const cdBack = new Map<string, string>();

        lsMap.set("backpack", "camera wrench zapgun");
        lsMap.set("dog", "dogToy");
        lsMap.set("cat", "catToy");

        cdMap.set("home", ["dog", "cat", "backpack"]);

        cdBack.set("dog", "home");
        cdBack.set("cat", "home");
        cdBack.set("backpack", "home");

        // Add a background
        this.add.rectangle(640, 360, 1280, 720, 0x050);
        this.add.image(100, 200, "alfred");
        this.add.image(100, 700, "spy");

        // Add text input field
        this.inputField = document.createElement("input");
        this.inputField.type = "text";
        this.inputField.style.position = "absolute";
        this.inputField.style.width = "600px";
        this.inputField.style.height = "40px";
        this.inputField.style.fontSize = "20px";
        this.inputField.style.top = "80%";
        this.inputField.style.left = "50%";
        this.inputField.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(this.inputField);

        // Add enter button
        const enterButton = this.add
            .text(1000, 570, "Enter", { fontSize: "24px", color: "#fff" })
            .setInteractive();

        let lineNum = 100;
        enterButton.on("pointerdown", () => {
            const newText = this.inputField.value;

            if (newText.trim() !== "") {
                lineNum += 50;
                if (newText.trim() == "ls") {
                    this.inputText.setText(
                        this.inputText.text + newText + "\n"
                    );
                    this.inputField.value = ""; // Empty the input field
                    this.inputText = this.add.text(
                        300,
                        lineNum,
                        (lsMap.get(state) as string) || "",
                        {
                            fontSize: "32px",
                            color: "#fff",
                        }
                    );
                    lineNum += 50;

                    this.inputText = this.add.text(300, lineNum, "user07: ", {
                        fontSize: "32px",
                        color: "#fff",
                    });
                } else if (newText.substring(0, 3) == "cd ") {
                    this.inputText.setText(
                        this.inputText.text + newText + "\n"
                    );

                    let cdInput: string = newText.substring(3);

                    // CD .. FUNCTIONALITY BELOW
                    const backState = cdBack.get(state);
                    const cdState = cdMap.get(state);

                    if (backState !== undefined && cdInput == "..") {
                        state = backState;
                        this.stateText.setText(state);
                        this.inputField.value = ""; // Empty the input field
                        this.inputText = this.add.text(
                            300,
                            lineNum,
                            "user07: ",
                            {
                                fontSize: "32px",
                                color: "#fff",
                            }
                        );
                    }

                    // CD FUNCTIONALITY BELOW
                    else if (
                        cdState !== undefined &&
                        cdMap.get(state)?.includes(cdInput)
                    ) {
                        state = newText.substring(3);

                        this.stateText.setText(state);

                        this.inputField.value = ""; // Empty the input field

                        this.inputText = this.add.text(
                            300,
                            lineNum,
                            "user07: ",
                            {
                                fontSize: "32px",
                                color: "#fff",
                            }
                        );
                    }

                    // CD DIRECTORY NOT FOUND BELOW
                    else {
                        this.inputField.value = ""; // Empty the input field

                        this.inputText = this.add.text(
                            300,
                            lineNum,
                            "Directory not found",
                            {
                                fontSize: "32px",
                                color: "#fff",
                            }
                        );

                        lineNum += 50;

                        this.inputText = this.add.text(
                            300,
                            lineNum,
                            "user07: ",
                            {
                                fontSize: "32px",
                                color: "#fff",
                            }
                        );
                    }
                }
                // NONSENSE INPUT BELOW
                else {
                    this.inputText.setText(
                        this.inputText.text + newText + "\n"
                    );
                    this.inputField.value = ""; // Empty the input field
                    this.inputText = this.add.text(300, lineNum, "user07: ", {
                        fontSize: "32px",
                        color: "#fff",
                    });
                }
            }
        });

        // Add text object to display input text
        this.inputText = this.add.text(300, 100, "user07: ", {
            fontSize: "32px",
            color: "#fff",
        });

        this.stateText = this.add.text(850, 100, state, {
            fontSize: "62px",
            color: "#fff",
        });
    }

    update() {}
}
