import { Client, ObjectData, UpdatePacket, NewTickPacket, Library, PacketHook, PlayerTextPacket, TextPacket, WorldPosData, Logger, RealmHeroesLeftPacket, UsePortalPacket, MapInfoPacket, EnemyShootPacket } from 'nrelay';
import { Movements } from './movements/Movements';
import { Realm } from './data-types/Realm';
import { Spacial } from './maths/Spacial';
import { JsonManager } from './json/JsonManager';
import { ShotInfo } from './data-types/ShotInfo';
import { Shot } from './data-types/Shot';
import { Vector2D } from './maths/Vector2D';
import { Dodger } from './dodger/Dodger';

@Library({
  name: 'Event Bot',
  author: 'Kosta & RealmServices',
})
class EventBotPlugin {
  private NexusWay      = new WorldPosData(107, 160.5);
  private Move          = new Movements();
  private bestRealm     = new Realm( new WorldPosData(0, 0), -1, "init", 0 );
  private lookForRealm  = false;
  private lock          = false;
  private isInNexus     = true;
  private sendPortal    = false;
  private entities      = new Map<number, Array<ShotInfo>>();
  private loadedEnemies = new Map<number, number>();

  constructor() {
    Logger.log( "Event Bot", `Started loading entities...` );
    this.entities = JsonManager.InitializeEnemies();
    Logger.log( "Event Bot", `Done loading ${this.entities.size} entities!` );
  }

  @PacketHook()
  public onTextPacket(client: Client, txt: TextPacket): void {
    if( txt.text == "tp" ) {
      const replyTextPacket = new PlayerTextPacket();
      replyTextPacket.text = '/teleport ' + txt.name;
      client.io.send(replyTextPacket);
    }
  }

  @PacketHook()
  public onEnemyShootPacket( client: Client, enemyShootPacket: EnemyShootPacket ): void {
    if( !( this.entities.has( this.loadedEnemies.get( enemyShootPacket.ownerId ) ) ) ) return;
    if ( client == undefined ) return;
    
    Logger.log( "EB esp", `${enemyShootPacket.startingPos.x}: ${enemyShootPacket.startingPos.y}` )
    var pos = enemyShootPacket.startingPos.clone();
    var player = client.worldPos.clone();


    var fired = new Shot( 
        pos.x,
        pos.y,
        enemyShootPacket.angle,
        enemyShootPacket.numShots,
        enemyShootPacket.angleInc,
        this.entities.get( this.loadedEnemies.get( enemyShootPacket.ownerId ) ),
        enemyShootPacket.bulletType
      );

      var ctPlayer = new Vector2D( player.x, player.y );
      var predicted = fired.GetPos(5);
      
      Logger.log( "EB", `${Spacial.IsInLineWithDelta( ctPlayer, predicted, 1 )}` );

      //if( Spacial.IsInLineWithDelta( ctPlayer, predicted, 0.5 ) ) {
        var ctDodge = Spacial.PolarToCartVec( Dodger.DodgeDirection( client, predicted ) );
        var nextPos = Vector2D.AddVector( ctPlayer, ctDodge ).GetWorldPos();

        Logger.log( "Event Bot", `Moving to ${nextPos.x}:${nextPos.y}` );
        client.nextPos.push( nextPos );
      //}
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
          this.lock       = false;
        }
      }
    }
  }

  @PacketHook()
  public onMapInfo( client: Client, mapInfoPacket: MapInfoPacket ) {
    this.isInNexus = mapInfoPacket.name == "Nexus" ? true : false;

    client.autoNexusThreshold = 0.2;
  }

  @PacketHook()
  public onUpdatePacket( client: Client, updatePacket: UpdatePacket ): void {
    this.enemyManager( updatePacket.newObjects, updatePacket.drops );

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

  private enemyManager( newObj: ObjectData[], droppedObj: number[] ): void {
    newObj.forEach( obj => {
      if( this.entities.has(obj.objectType) ) {
        if ( !this.loadedEnemies.has(obj.status.objectId) ) {
          this.loadedEnemies.set( obj.status.objectId, obj.objectType );
        }
      }
    });

    droppedObj.forEach( obj => {
      if( this.entities.has(obj) ) {
        this.loadedEnemies.delete( obj );
      }
    });
  }

  private UsePortal( client: Client,objId: number ) {
    Logger.log( "Event Bot", `Connected to realm ${this.bestRealm.name}` );

    var usePortal       = new UsePortalPacket();
    usePortal.objectId  = objId;
    usePortal.propagate = true;

    client.io.send( usePortal );
  }

  private OwnerIdToObjId( id: number ): number {
    if( this.loadedEnemies.has(id) ) {
      return this.loadedEnemies.get(id);
    }
  }
}
