class Player {
    //obviously we need to rework this alot but just wanted to get an idea up
    name: string;
    hearts: number;
    shields: number;
    weapons: string[];
    items: string[];
    constructor(
        name: string,
        hearts: number,
        shields: number,
        weapons: string[],
        items: string[]
    ) {
        this.name = name;
        this.hearts = hearts;
        this.shields = shields;
        this.weapons = weapons;
        this.items = items;
    }
}

export default Player;
