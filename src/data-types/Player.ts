import { Vector2D } from "../maths/Vector2D";

export class Player {
    public name: string;
    public pos: Vector2D;
    public objId: number;

    constructor( name: string, pos: Vector2D, objId: number ) {
        this.name = name;
        this.pos = pos;
        this.objId = objId;
    }
}