import Phaser from "phaser";

export default class BooleanBlock extends Phaser.GameObjects.Image {
    /*
    BooleanBlock is the GameObject that represents the blocks on the board
    It is given a scene, x and y coordinates, and a texture based on its type
    */
    private gridLocation: [number, number]; // gridLocation stores a block's location on the grid locally counting from the top left [row, column]

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        type: string,
        gridLocation: [number, number]
    ) {
        let img: string = "";
        switch (type) {
            case "and": {
                img = "and-block";
                break;
            }
            case "or": {
                img = "or-block";
                break;
            }
            case "not": {
                img = "not-block";
                break;
            }
            case "true": {
                img = "true-block";
                break;
            }
            case "false": {
                img = "false-block";
                break;
            }
        }
        super(scene, x, y, img);
        this.gridLocation = gridLocation;
    }

    public getGridLocation() {
        return this.gridLocation;
    }

    public setGridLocation(newGridLication: [number, number]) {
        this.gridLocation = newGridLication;
    }
}
