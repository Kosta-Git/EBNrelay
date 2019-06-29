import { Client, ObjectData, UpdatePacket, NewTickPacket, Library, PacketHook, PlayerTextPacket, TextPacket, WorldPosData, Logger, RealmHeroesLeftPacket, UsePortalPacket, MapInfoPacket } from 'nrelay';
import { Movements } from './movements/Movements';
import { Realm } from './data-types/Realm';
import { Spacial } from './maths/Spacial';
import { JsonManager } from './json/JsonManager';
import { ShotInfo } from './data-types/ShotInfo';

@Library({
  name: 'Event Bot',
  author: 'Kosta & RealmServices',
})
class EventBotPlugin {
  private NexusWay     = new WorldPosData(107, 160.5);
  private Move         = new Movements();
  private bestRealm    = new Realm( new WorldPosData(0, 0), -1, "init", 0 );
  private lookForRealm = false;
  private lock         = false;
  private isInNexus    = true;
  private sendPortal   = false;
  private entities     = new Map<string, Array<ShotInfo>>();

  constructor() {
    Logger.log( "Event Bot", `Started loading entities...` );
    this.entities = JsonManager.InitializeEnemies();
    Logger.log( "Event Bot", `Done loading ${this.entities.size}!` );
  }

  @PacketHook()
  public onNewTickPacket( client: Client, newTickPacket: NewTickPacket ): void {
    if ( client.mapInfo.name == "Nexus" && this.isInNexus ) {
      if( !Spacial.isOnPos(client.worldPos, new WorldPosData(107, 132)) && !this.lock ) {
        client.nextPos.push(this.NexusWay);
        client.nextPos.push( new WorldPosData(107, 132) );
        this.lock = true;
      } else {
        if(!Spacial.isOnPos(client.worldPos, this.bestRealm.pos)) {
          this.getOutOfNexus( client );
        } else if ( Spacial.isOnPos(client.worldPos, this.bestRealm.pos) ) {
          this.isInNexus  = false;
          this.sendPortal = true;
        }
      }
    }
  }

  @PacketHook()
  public onMapInfo( client: Client, mapInfoPacket: MapInfoPacket ) {
    this.isInNexus = mapInfoPacket.name == "Nexus" ? true : false;

    if ( this.isInNexus ) {
      client.autoNexusThreshold = 0;
    } else {
      client.autoNexusThreshold = 20;
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

    if ( this.sendPortal && client.nextPos.length == 0 ) {
      this.UsePortal( client, this.bestRealm.id );
      this.sendPortal = false;
    }
  }

  private getOutOfNexus( client: Client ) : void {
    if ( this.bestRealm.players != -1 ) {
      client.nextPos.push( this.bestRealm.pos );
    }
  }

  private findBestRealm( data: ObjectData[] ) : Realm {
    var best = new Realm( new WorldPosData(0, 0), -1, "init", 0 );

    data.forEach(function(obj) {
      obj.status.stats.forEach(function(val){ 
        if ( val.stringStatValue != undefined ){

          if ( val.stringStatValue.startsWith("NexusPortal") ){
            var players = val.stringStatValue.split(" ")[1].replace("(", "").split("/")[0];
            var name    = val.stringStatValue.split(".")[1].split(" ")[0];

            if ( Number(players) > best.players )
              best = new Realm( obj.status.pos, Number(players), name, obj.status.objectId );
          }
        }
      });
    });

    return best;
  }

  private UsePortal( client: Client,objId: number ) {
    Logger.log( "Event Bot", `Connected to realm ${this.bestRealm.name}` );

    var usePortal       = new UsePortalPacket();
    usePortal.objectId  = objId;
    usePortal.propagate = true;

    client.io.send( usePortal );
  }
}
