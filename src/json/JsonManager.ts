import { Environment, Logger, Projectile } from 'nrelay';
import { Entity } from 'nrelay/lib/models/entity';
import { readFile, readFileSync } from 'fs';
import { ShotInfo } from '../data-types/ShotInfo';

export class JsonManager {
    public static InitializeEnemies() : Map<string, Array<ShotInfo>> {
        var data     = readFileSync( "/home/kosta/Nextcloud/Coding/rotmg-projects/eventbot/src/json/Objects.json" );
        var parsed   = JSON.parse( data.toString() );
        var parsed   = parsed["Object"];
        var entities = new Map<string, Array<ShotInfo>>();
        var enemId   = new Array<string>();


        for ( var prop in parsed ) {
            for ( var entVal in parsed[prop] ) {
                if ( entVal == "Enemy" ) {
                    enemId.push( prop );
                }
            }
        }

        enemId.forEach(function(id){
            try {
                var shots = Array<ShotInfo>();
                for ( var shot in parsed[id]["Projectile"] ) {
                    if ( 
                        parsed[id]["Projectile"][shot]["Damage"] !== undefined 
                        || parsed[id]["Projectile"][shot]["Speed"] !== undefined 
                        || parsed[id]["Projectile"][shot]["LifetimeMS"] !== undefined 
                        ) {
                            var dmg = Number( parsed[id]["Projectile"][shot]["Damage"]     );
                            var spd = Number( parsed[id]["Projectile"][shot]["Speed"]      ) / 10;
                            var lft = Number( parsed[id]["Projectile"][shot]["LifetimeMS"] );

                            shots.push( new ShotInfo( dmg, spd, lft ) );
                        }
                }
                entities.set( id, shots );
            } catch {

            }
        });

        return entities;
    }
}