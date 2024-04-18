import Player from "./player";

export class gameState {
    //will need to add to this eventually
    player: Player;
    level: number;
    hasAnims: boolean;
    curRoom: string;
    constructor(
        player: Player,
        level: number,
        hasAnims: boolean,
        curRoom: string
    ) {
        this.player = player;
        this.level = level;
        this.hasAnims = hasAnims;
        this.curRoom = curRoom;
    }
}
