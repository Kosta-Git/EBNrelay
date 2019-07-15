import { Client, ObjectData, UpdatePacket, NewTickPacket, Library, PacketHook, PlayerTextPacket, TextPacket, WorldPosData, Logger, RealmHeroesLeftPacket, UsePortalPacket, MapInfoPacket, EnemyShootPacket, QuestObjectIdPacket, LoadPacket, LogLevel, Runtime, Classes, StatData, TeleportPacket } from 'nrelay';
import { Movements } from './movements/Movements';
import { Realm } from './data-types/Realm';
import { Spacial } from './maths/Spacial';
import { JsonManager } from './json/JsonManager';
import { ShotInfo } from './data-types/ShotInfo';
import { Shot } from './data-types/Shot';
import { Vector2D } from './maths/Vector2D';
import { Dodger } from './dodger/Dodger';
import { EventEntity } from './data-types/EventEntity';
import { Player } from './data-types/Player';
import { stringify } from 'querystring';

@Library({
  name: 'Event Bot',
  author: 'Kosta & RealmServices',
})
class EventBotPlugin {
  private NexusWay = new WorldPosData(107, 160.5);
  private Move = new Movements();
  private bestRealm = new Realm(new WorldPosData(0, 0), -1, "init", 0);
  private lookForRealm = false;
  private lock = false;
  private isInNexus = true;
  private sendPortal = false;
  private entities = new Map<number, Array<ShotInfo>>();
  private loadedEnemies = new Map<number, number>();
  private quest = -1;
  private questEntity = new EventEntity();
  private hasValidQuest = false;
  private realmPlayers = new Array<Player>();
  private lastTpTime = 0;

  constructor() {
    Logger.log("Event Bot", `Started loading entities...`, LogLevel.Info);
    this.entities = JsonManager.InitializeEnemies();
    Logger.log("Event Bot", `Done loading ${this.entities.size} entities!`, LogLevel.Success);
  }

  @PacketHook()
  public onTextPacket(client: Client, txt: TextPacket): void {
    if (txt.text == "tp") {
      const replyTextPacket = new PlayerTextPacket();
      replyTextPacket.text = '/teleport ' + txt.name;
      client.io.send(replyTextPacket);
    }
  }

  @PacketHook()
  public onQuestObjectIdPacket(client: Client, quest: QuestObjectIdPacket): void {
    this.quest = quest.objectId;
  }

  @PacketHook()
  public onEnemyShootPacket(client: Client, enemyShootPacket: EnemyShootPacket): void {
    if (!(this.entities.has(this.loadedEnemies.get(enemyShootPacket.ownerId)))) return;
    if (client == undefined) return;

    var pos = enemyShootPacket.startingPos.clone();
    var player = client.worldPos.clone();


    var fired = new Shot(
      pos.x,
      pos.y,
      enemyShootPacket.angle,
      enemyShootPacket.numShots,
      enemyShootPacket.angleInc,
      this.entities.get(this.loadedEnemies.get(enemyShootPacket.ownerId)),
      enemyShootPacket.bulletType
    );

    var ctPlayer = new Vector2D(player.x, player.y);
    var predicted = fired.GetPos(5);
    if( Spacial.IsInLineWithDelta( ctPlayer, predicted, 0.5 ) ) {
      if( this.hasValidQuest )
        Dodger.Dodge( client, predicted, this.questEntity.pos );
      else
        Dodger.Dodge( client, predicted, new Vector2D( pos.x, pos.y ) );
    }
  }

  @PacketHook()
  public onNewTickPacket(client: Client, newTickPacket: NewTickPacket): void {
    if (client.mapInfo.name == "Nexus" && this.isInNexus) {
      if (!Spacial.isOnPos(client.worldPos, new WorldPosData(107, 132)) && !this.lock) {
        client.nextPos.push(this.NexusWay);
        client.nextPos.push(new WorldPosData(107, 132));
        this.lock = true;
      } else {
        if (!Spacial.isOnPos(client.worldPos, this.bestRealm.pos)) {
          this.getOutOfNexus(client);
        } else if (Spacial.isOnPos(client.worldPos, this.bestRealm.pos)) {
          this.isInNexus = false;
          this.sendPortal = true;
          this.lock = false;
        }
      }
    } else if (!this.isInNexus && this.hasValidQuest) {
      var toTp = this.FindClosestToQuest(client);

      if (toTp.name != "none" && Math.abs(client.getTime() - this.lastTpTime) > 5000) {
        var tpPacket = new TeleportPacket();
        tpPacket.objectId = toTp.objId;

        client.io.send(tpPacket);

        this.lastTpTime = client.getTime();
      }
      var questPos = this.questEntity.pos;
      var clientPos = new Vector2D( client.worldPos.x, client.worldPos.y );
      var xDiff = Math.abs( clientPos.x - questPos.x );
      var yDiff = Math.abs( clientPos.y - questPos.y );
      if ( xDiff >= 2 && xDiff <= 6 && yDiff >= 2 && yDiff <= 6 ) {
      } else {
        var pos = this.questEntity.pos.GetWorldPos();
        client.nextPos.push(pos);
      }
    }
  }

  @PacketHook()
  public onMapInfoPacket(client: Client, mapInfoPacket: MapInfoPacket) {
    this.isInNexus = mapInfoPacket.name == "Nexus" ? true : false;

    client.autoNexusThreshold = 0.2;
    client.autoAim = true;

    if (this.isInNexus) {
      this.questEntity = null;
      this.hasValidQuest = false;
      this.loadedEnemies.clear();
      this.quest = 0;
      this.realmPlayers = new Array<Player>();
    }
  }

  @PacketHook()
  public onUpdatePacket(client: Client, updatePacket: UpdatePacket): void {
    this.enemyManager(updatePacket.newObjects, updatePacket.drops);

    if (this.isInNexus) {
      var realm = this.findBestRealm(updatePacket.newObjects);

      if (realm.players > this.bestRealm.players) {
        this.bestRealm = realm;
      }
    }

    if (this.sendPortal && client.nextPos.length == 0) {
      this.UsePortal(client, this.bestRealm.id);
      this.sendPortal = false;
    }
  }

  private getOutOfNexus(client: Client): void {
    if (this.bestRealm.players != -1) {
      client.nextPos.push(this.bestRealm.pos);
    }
  }

  private findBestRealm(data: ObjectData[]): Realm {
    var best = new Realm(new WorldPosData(0, 0), -1, "init", 0);

    data.forEach(function (obj) {
      obj.status.stats.forEach(function (val) {
        if (val.stringStatValue != undefined) {

          if (val.stringStatValue.startsWith("NexusPortal")) {
            var players = val.stringStatValue.split(" ")[1].replace("(", "").split("/")[0];
            var name = val.stringStatValue.split(".")[1].split(" ")[0];

            if (Number(players) > best.players)
              best = new Realm(obj.status.pos, Number(players), name, obj.status.objectId);
          }
        }
      });
    });

    return best;
  }

  private enemyManager(newObj: ObjectData[], droppedObj: number[]): void {
    newObj.forEach(obj => {
      if (Object.values(Classes).includes(obj.objectType)) {
        this.realmPlayers.push(new Player(obj.status.stats[20].stringStatValue, new Vector2D(obj.status.pos.x, obj.status.pos.y), obj.status.objectId))
      }

      if (obj.status.objectId == this.quest && !this.hasValidQuest) {
        this.questEntity = new EventEntity();
        this.questEntity.id = JsonManager.IdToName(obj.objectType);
        this.questEntity.objId = this.quest;
        this.questEntity.objType = obj.objectType;
        this.questEntity.pos = new Vector2D(obj.status.pos.x, obj.status.pos.y);

        this.hasValidQuest = true;
        Logger.log("Event Bot", `Found quest ${this.questEntity.id} at ${this.questEntity.pos.x}, ${this.questEntity.pos.y}`);
      }

      if (this.entities.has(obj.objectType)) {
        if (!this.loadedEnemies.has(obj.status.objectId)) {
          this.loadedEnemies.set(obj.status.objectId, obj.objectType);
        }
      }
    });

    droppedObj.forEach(obj => {
      if (this.entities.has(obj)) {
        this.loadedEnemies.delete(obj);
      }

      if( this.hasValidQuest )
        if( this.questEntity.objId == obj ) {
          this.quest = 0;
          this.questEntity = new EventEntity();
          this.hasValidQuest = false;
        }

      this.realmPlayers.forEach((el, i) => {
        if (el.objId == obj) {
          this.realmPlayers.splice(i, 1);
        }
      });
    });
  }

  private UsePortal(client: Client, objId: number) {
    Logger.log("Event Bot", `Connected to realm ${this.bestRealm.name}`);

    var usePortal = new UsePortalPacket();
    usePortal.objectId = objId;
    usePortal.propagate = true;

    client.io.send(usePortal);
  }

  private OwnerIdToObjId(id: number): number {
    if (this.loadedEnemies.has(id)) {
      return this.loadedEnemies.get(id);
    }
  }

  private FindClosestToQuest(client: Client): any {
    var clientPos = new Vector2D(client.worldPos.x, client.worldPos.y);
    var clientToQuest = Spacial.GetDist2D(clientPos, this.questEntity.pos);
    var bestPlayer = { name: "none", pos: new Vector2D(0, 0), dist: 10000000000000000, objId: -1 };
    this.realmPlayers.forEach((el) => {
      var dist = Spacial.GetDist2D(el.pos, this.questEntity.pos);
      if (dist < bestPlayer.dist && dist < clientToQuest ) {
        bestPlayer.dist = dist;
        bestPlayer.name = el.name;
        bestPlayer.pos = el.pos;
        bestPlayer.objId = el.objId;
      }
    });

    return bestPlayer;
  }
}
