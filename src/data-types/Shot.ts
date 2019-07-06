import { Vector2D } from "../maths/Vector2D";
import { Spacial } from "../maths/Spacial";
import { ShotInfo } from "./ShotInfo";
import { Logger } from "nrelay";

export class Shot {
    private _pos: Vector2D;
    private _direction: number;
    private _directionInc: number;
    private _nbProj: number;
    private _shotId: number;
    private _info: Array<ShotInfo>;

    private _tickTime: number = 200;

    constructor( 
        x: number,
        y: number,
        angle: number,
        nbProj: number,
        angleInc: number,
        info: Array<ShotInfo>,
        id: number
    ) {
        this._pos = new Vector2D( x, y );
        this._direction = angle;
        this._nbProj = nbProj;
        this._directionInc = angleInc;
        this._info = info;
        this._shotId = id;
    }

    public GetPos( ticks: number = 1 ): Array<Array<Vector2D>> {
        var positions = new Array<Array<Vector2D>>();

        if ( ticks > this.GetMaxTicksForShot() ) {
            ticks = this.GetMaxTicksForShot();
        }

        for ( var nbShots = 0; nbShots < this._nbProj; ++nbShots ) {
            var currentShot = new Array<Vector2D>();
            for( var i = 0; i < ticks; ++i ) {
                var acceleration = Spacial.PolarToCart( 
                    this._direction + nbShots * this._directionInc,
                     this._info[ this._shotId ].speed
                 );

                 acceleration.MulScalar( i );

                 currentShot.push( Vector2D.AddVector( this._pos, acceleration ) );
            }
            positions.push( currentShot );
        }

        return positions;
    }

    private GetMaxTicksForShot(): number {
        return Math.ceil( this._info[this._shotId].lifetime / this._tickTime );
    }

    public GetMaxTime( id: number ): number {
        return this._info[ id ].lifetime;
    }
}