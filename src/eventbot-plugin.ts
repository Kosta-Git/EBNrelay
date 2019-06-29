import { Client, ObjectData, UpdatePacket, NewTickPacket, Library, PacketHook, PlayerTextPacket, TextPacket, WorldPosData, Logger, RealmHeroesLeftPacket } from 'nrelay';
import { Movements } from './movements/Movements';
import { Realm } from './data-types/Realm';

@Library({
  name: 'Event Bot',
  author: 'Kosta & RealmServices',
})
class EventBotPlugin {
  private NexusWay  = new WorldPosData(107, 160.5);
  private Move      = new Movements();
  private bestRealm = new Realm( new WorldPosData(0, 0), -1, "init" );
  private lookForRealm = false;
  private lock         = false;
  private isInNexus    = true;

  @PacketHook()
  public onNewTickPacket( client: Client, newTickPacket: NewTickPacket ): void {
    if ( client.mapInfo.name == "Nexus" ) {
      if( !this.isOnPos(client.worldPos, new WorldPosData(107, 132)) && !this.lock ) {
        client.nextPos.push(this.NexusWay);
        client.nextPos.push( new WorldPosData(107, 132) );
        this.lock = true;
      } else {
        if(!this.isOnPos(client.worldPos, this.bestRealm.pos))
          this.getOutOfNexus( client );
      }
    }
  }

  @PacketHook()
  public onUpdatePacket( client: Client, updatePacket: UpdatePacket ): void {
    if ( this.isInNexus ) {
      var realm = this.findBestRealm(updatePacket.newObjects);

      if ( realm.players > this.bestRealm.players ) {
        this.bestRealm = realm;
      }
    }
  }

  private getOutOfNexus( client: Client ) : void {
    if ( this.bestRealm.players != -1 ) {
      client.nextPos.push( this.bestRealm.pos );
    }
  }

  private getPos( client: Client ): any {
    var ppos = client.playerData.worldPos.clone();
    ppos.x   = Math.round(ppos.x);
    ppos.y   = Math.round(ppos.y);

    return ppos;
  }

  private isOnPosNumber( x: number, y: number ): boolean {
    return Math.abs(x - y) <= 1;
  }

  private isOnPos( a: any, b: any ): boolean {
    return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
  }

  private findBestRealm( data: ObjectData[] ) : Realm {
    var best = new Realm( new WorldPosData(0, 0), -1, "init" );

    data.forEach(function(obj) {
      obj.status.stats.forEach(function(val){

        if ( val.stringStatValue != undefined ){

          if ( val.stringStatValue.startsWith("NexusPortal") ){
            var players = val.stringStatValue.split(" ")[1].replace("(", "").split("/")[0];
            var name    = val.stringStatValue.split(".")[1].split(" ")[0];

            if ( Number(players) > best.players )
              best = new Realm( obj.status.pos, Number(players), name );
          }
        }
      });
    });

    return best;
  }
}
