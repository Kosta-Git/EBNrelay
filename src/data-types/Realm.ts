import { 
    WorldPosData
} from 'nrelay';

export class Realm {
    public pos: WorldPosData;
    public players: Number;
    public name: String;

    constructor( worldPos: WorldPosData, players: Number, name: String ) {
        this.pos = worldPos;
        this.players = players;
        this.name = name;
    }
}