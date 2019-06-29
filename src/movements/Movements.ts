import { 
    Client, 
    WorldPosData,
    ConditionEffect
} from 'nrelay';

export class Movements {
    private tps    = 0
    private ticks  = 4;

    public getTile(client: Client,x: number, y: number): any {
        return client.mapTiles[
            Math.floor(y) * client.mapInfo.height 
            + Math.floor(x)
        ];
    }

    public canWalkOnTile(client: Client, x: number, y: number): any {
        return !this.getTile(client, x, y).occupied;
    }

    public getSpeed(client: Client): any {
        return client.playerData.spd;
    }

    public isSpeedy(client: Client): any {
        return client.playerData.condition == ConditionEffect.SPEEDY;
    }

    public isSlowed(client: Client): any {
        return client.playerData.condition == ConditionEffect.SLOWED;
    }

    private setMaxTile(client: Client): any {
        var isSpeedy = this.isSpeedy(client);
        var isSlowed = this.isSlowed(client);
        var speed    = this.getSpeed(client);

        if (isSlowed) {
            this.tps = 4;
        } else if (isSpeedy) {
            this.tps = (4 + 5.6 * (speed / 75)) * 1.5;
        } else {
            this.tps = 4 + 5.6 * (speed / 75);
        }

        this.tps /= this.ticks;
    }

    public getTPS(client: Client): any {
        this.setMaxTile(client);
        return this.tps;
    }

    public getDist2D(client: Client, to: WorldPosData) {
        var current = client.worldPos.clone();

        return Math.sqrt( Math.pow(to.x - current.x, 2) + Math.pow(to.y - current.y, 2) );
    }
  }