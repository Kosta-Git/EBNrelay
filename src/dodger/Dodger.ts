import { Vector2D } from '../maths/Vector2D';
import { Spacial } from '../maths/Spacial';
import { Shot } from '../data-types/Shot';
import { Client, Random } from 'nrelay';
import { Movements } from '../movements/Movements';

export class Dodger {
    private static Mover = new Movements();
    private static rnd = new Random(48941941);

    public static Dodge( client: Client, trails: Array<Array<Vector2D>>, towards: Vector2D ) {
        var playerPos = new Vector2D( client.worldPos.x, client.worldPos.y );
        var distToObj = Spacial.GetDist2D( playerPos, towards );
        var angleToObj = Spacial.GetAngle( playerPos, towards );

        if( Math.abs( distToObj ) >= 2 ) {
            this.Logic( client, -angleToObj, trails );
        } else {
            this.Logic( client, angleToObj, trails );
        }
    }

    private static Logic( client: Client, angleToObj: number, trails: Array<Array<Vector2D>> ) {
        var offset = 0;
            if( this.goLeft() ) {
                offset = 0.3;
            } else {
                offset = -0.3;
            }

            var nextPos = new Vector2D( offset, angleToObj );
            var isValid = true;
            if ( Spacial.IsInLineWithDelta( nextPos, trails, 0.15 ) ) isValid = false;

            if( isValid ) {
                client.nextPos.push( Spacial.PolarToCartVec(nextPos).GetWorldPos() );
            }
    }

    private static GetOrthoVec( trail: Array<Vector2D> ): Vector2D {
        var line = Vector2D.Vectorize( trail[0], trail[1] );

        return new Vector2D( line.y, -line.x );
    }

    private static goLeft(): boolean {
        return this.rnd.nextIntInRange(0, 10) > 5;
    }

    private static goTowards(): boolean {
        return this.rnd.nextIntInRange(0, 10) > 3;
    }
}