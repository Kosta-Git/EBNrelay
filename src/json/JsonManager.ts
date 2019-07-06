import { Environment, Logger, DamagePacket } from 'nrelay';
import { Entity } from 'nrelay/lib/models/entity';
import { readFile, readFileSync } from 'fs';
import { ShotInfo } from '../data-types/ShotInfo';
import { RootObject, Projectile, ProjectileItem, ObjectItem } from './json-interfaces';

export class JsonManager {
    public static InitializeEnemies(): Map<number, Array<ShotInfo>> {
        var data     = readFileSync( "/home/kosta/Nextcloud/Coding/rotmg-projects/eventbot/src/json/Objects.json" );
        var parsed   = JSON.parse( data.toString() );
        var parsed   = parsed["Object"];
        var entities = new Map<number, Array<ShotInfo>>();
        var enemId   = new Array<number>();


        parsed.forEach( (element: any) => {
            if( element.Enemy !== undefined ) {
                var shots = Array<ShotInfo>();
                try {
                    element.Projectile.forEach( (proj: any) => {
                        var dmg = Number( proj.Damage );
                        var spd = Number( proj.Speed ) / 10;
                        var lft = Number( proj.LifetimeMS );
                        shots.push( new ShotInfo( dmg, spd, lft ) );
                    } )
                } catch {
                    if( element.Projectile != undefined ) {
                        var dmg = Number( element.Projectile.Damage );
                        var spd = Number( element.Projectile.Speed ) / 10;
                        var lft = Number( element.Projectile.LifetimeMS );
                        
                        shots.push( new ShotInfo( dmg, spd, lft ) );
                    }
                }

                if ( shots.length > 0 ) {
                    entities.set( parseInt( element.type, 16 ), shots );
                }
            }
        });

        return entities;
    }
}