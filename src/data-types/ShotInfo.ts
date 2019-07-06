export class ShotInfo {
    public damage   : number;
    public speed    : number;
    public lifetime : number;

    constructor( damage: number, speed: number, lifetime: number ) {
        this.damage   = damage;
        this.speed    = speed;
        this.lifetime = lifetime;
    }

    public toString = () : string => {
        if ( this.speed === undefined ) {
            return "fuck";
        }

        return `${this.damage}, ${this.speed}, ${this.lifetime}`;
    }
}