import { Vector2D } from './Vector2D'; 

export class Spacial { 
    public static PolarToCart( rho: number, theta: number ) : Vector2D {
        return new Vector2D( rho * Math.cos( theta ), rho * Math.sin( theta ) );
    }

    public static CartToPolar( x: number, y: number ) : Vector2D {
        var rho   = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
        var theta = Math.atan( y / x );

        return new Vector2D( rho, theta );
    }

    public static PolarToCartVec( pos : Vector2D ) : Vector2D {
        return new Vector2D( pos.x * Math.cos( pos.y ), pos.x * Math.sin( pos.y ) );
    } 

    public static CartToPolarVec( pos: Vector2D ) : Vector2D {
        var rho   = Math.sqrt( Math.pow( pos.x, 2 ) + Math.pow( pos.y, 2 ) );
        var theta = Math.atan( pos.y / pos.x );

        return new Vector2D( rho, theta );
    }

    public static DegreeToRadian( angle: number ) : number {
        return Math.PI * angle / 180.0;
    }

    public static RadianToDegree( angle: number ) : number {
        return angle * ( 180.0 / Math.PI );
    }

    public static IsInLine( toCheck: Vector2D, line: Array<Vector2D>) : boolean {
            return ( toCheck.y - line[0].y ) / ( toCheck.x - line[0].x ) == ( line[1].y - line[0].y ) / ( line[1].x - line[0].x );
    }

    public static IsInLineWithDelta( toCheck: Vector2D, line: Array<Array<Vector2D>>, delta=0.2 ) : boolean {
        line.forEach( function (shotTrail) {
            var a = ( toCheck.y - shotTrail[ 0 ].y ) / ( toCheck.x - shotTrail[ 0 ].x );
            var b = ( shotTrail[ 1 ].y - shotTrail[ 0 ].y ) / ( shotTrail[ 1 ].x - shotTrail[ 0 ].x );

            if ( Math.abs( a - b ) < delta )
                return true;
        } );

        return false;
    }

    public static GetDist2D( a: Vector2D, b: Vector2D) : number {
            return Math.sqrt( Math.pow( b.x - a.x, 2 ) + Math.pow( b.y - a.y, 2 ) );
    }
}