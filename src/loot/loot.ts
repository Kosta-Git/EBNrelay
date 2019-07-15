import { PacketHook, Client, LogLevel, Logger } from "nrelay";
import { Vector2D } from "../maths/Vector2D";
import { Bags } from "../enums/Events";

export class LootState {
    public LootBagItems = new Map<number, number[]>();
    public LootBagLocations = new Map<Number, Vector2D>();
    public LastLoot = 0;
    public LastNotif = 0;
    public CustomQuest = -1;
    public OriginalQuest = -1;
}

export class AutoLoot {
    public static clientLoot = new Map<string, LootState>();
    public static desiredBags = [ Bags.Brown, Bags.Blue, Bags.Cyan, Bags.Orange, Bags.Pink, Bags.Purple, Bags.Red, Bags.White ];

    public static AddClient( client: Client ) : boolean {
        if ( AutoLoot.clientLoot.has( client.alias ) ) return false;

        Logger.log( "Event Bot", `${client.alias} was added to autoloot.`, LogLevel.Success );
        
        AutoLoot.clientLoot.set( client.alias, new LootState() );
        return true;
    }

    public static RemoveClient( client: Client ) {
        if ( !AutoLoot.clientLoot.has( client.alias ) ) return false;

        Logger.log( "Event Bot", `${client.alias} was removed from autoloot.`, LogLevel.Success );
        
        AutoLoot.clientLoot.delete( client.alias );
        return true;
    }
}