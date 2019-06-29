export class Vector2D {
    public x: number;
    public y: number;

    constructor( x: number, y: number ) {
        this.x = x;
        this.y = y;
    }

    public GetNorm() : number {
        return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
    }

    public GetPerpendicular() : Vector2D {
        return new Vector2D( this.y, -this.x );
    }

    // Overloads
    public AddVector( a : Vector2D )  {
        this.x += a.x;
        this.y += a.y ;
    }

    public AddScalar( a: number ) {
        this.x += a;
        this.y += a;
    }

    public SubVector( a: Vector2D ) {
        this.x -= a.x;
        this.y -= a.y;
    }

    public SubScalar( a: number ) {
        this.x -= a;
        this.y -= a;
    }

    public MulVector( a: Vector2D ) {
        this.x *= a.x;
        this.y *= a.y;
    }

    public MulScalar( a: number ) {
        this.x *= a;
        this.y *= a;
    }

    public DivVector( a: Vector2D ) {
        this.x /= a.x;
        this.y /= a.y;
    }

    public DivScalar( a: number ) {
        this.x /= a;
        this.y /= a;
    }

    // Static overloads
    public static AddVector( a : Vector2D, b: Vector2D ) : Vector2D  {
        return new Vector2D( a.x + b.x, a.y + b.y );
    }

    public static AddScalar( a:Vector2D, b: number ) : Vector2D {
        return new Vector2D( a.x + b, a.y + b );
    }

    public static SubVector( a: Vector2D, b : Vector2D ) : Vector2D {
        return new Vector2D( a.x - b.x, a.y - b.y );
    }

    public static SubScalar( a: Vector2D, b: number ) : Vector2D {
        return new Vector2D( a.x - b, a.y - b );
    }

    public static MulVector( a: Vector2D, b: Vector2D ) : Vector2D {
        return new Vector2D( a.x * b.x, a.y * b.y );
    }

    public static MulScalar( a: Vector2D, b: number ) : Vector2D {
        return new Vector2D( a.x * b, a.y * b );
    }

    public static DivVector( a: Vector2D, b: Vector2D ) : Vector2D {
        return new Vector2D( a.x / b.x, a.y / b.y );
    }

    public static DivScalar( a: Vector2D, b: number ) : Vector2D {
        return new Vector2D( a.x / b, a.y / b );
    }

    public static Vectorize( a: Vector2D, b: Vector2D ): Vector2D {
        return Vector2D.SubVector( b, a );
    }
}