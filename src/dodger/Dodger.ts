import { Vector2D } from '../maths/Vector2D';
import { Spacial } from '../maths/Spacial';
import { Shot } from '../data-types/Shot';
import { Client } from 'nrelay';
import { Movements } from '../movements/Movements';

export class Dodger {
    private static Mover = new Movements();

    public static DodgeDirection( client: Client, trails: Array<Array<Vector2D>> ): Vector2D {
        var directions = new Array<Vector2D>();
        trails.forEach((trail) => {
            directions.push( Spacial.CartToPolarVec( this.GetOrthoVec( trail ) ) );
        });

        var generalDirection = 0;
        directions.forEach((dir) => {
            generalDirection += dir.y;
        });

        return new Vector2D( this.Mover.getTPS( client ), generalDirection );
    }

    private static GetOrthoVec( trail: Array<Vector2D> ): Vector2D {
        var line = Vector2D.Vectorize( trail[0], trail[1] );

        return new Vector2D( line.y, -line.x );
    }
}