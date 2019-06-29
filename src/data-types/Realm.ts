import { 
    WorldPosData
} from 'nrelay';

export class Realm {
    public pos: WorldPosData;
    public players: Number;
    public name: String;
    public id : number

    constructor( worldPos: WorldPosData, players: Number, name: String, id: number ) {
        this.pos = worldPos;
        this.players = players;
        this.name = name;
        this.id = id;
    }
}