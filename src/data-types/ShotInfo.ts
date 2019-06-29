export class ShotInfo {
    public damage   : Number;
    public speed    : Number;
    public lifetime : Number;

    constructor( damage: Number, speed: Number, lifetime: Number ) {
        this.damage   = damage;
        this.speed    = speed;
        this.lifetime = lifetime;
    }
}