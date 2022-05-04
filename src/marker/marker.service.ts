import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { Connector } from 'src/entity/connector.entity';
import { EndPoint } from 'src/entity/endPoint.entity';
import { Marker } from 'src/entity/marker.entity';

@Injectable()
export class MarkerService {
    constructor(private readonly neo4jService: Neo4jService) { }
    list(): Promise<Marker[]> {
        return this.neo4jService.read(`MATCH (m:Marker) RETURN m`)
            .then(res => res.records.map(row => new Marker(row.get('m'))))
    }
    create(longitude: number, latitude: number): Promise<Marker> {
        return this.neo4jService.write(`
        CREATE(m:Marker{
            id: randomUUID(),
            longitude:$longitude,
            latitude:$latitude
        })return m`, {
            longitude
            , latitude
        }).then(
            ({ records }) => new Marker(records[0].get('m'))
        );
    }
    update(markerID:string,updates: Record<string, any>):Promise<Marker|undefined>
    {
        return this.neo4jService.write(`MATCH(m:Marker{id:$markerID}
            m+=$updates
            return m
            )`,{markerID,updates}).then(
                res=>{
                    if (res.records.length == 0) return undefined
                    return  new Marker(res.records[0].get('m'))
                }
            )
    }
    remove(markerID:string):Promise<Boolean>{
        return this.neo4jService.write(`
        MATCH(m:Marker{id:$markerID})
        DETATCH DELETE m
        Return m
        `,{markerID}).then(
            (res)=>{
                return (res.records.length == 1) 
            }
        )
    }
    start(markerID: string, connectorID: string): Promise<Marker | undefined> {
        return this.neo4jService.read(`
        MATCH(m:Marker{id:$markerID})
        MATCH(c:Connector{id:$connectorID})
        Merge (m)-[start:start]->(c)
        return m
        `, {
            markerID,
            connectorID
        }).then((res) => {
            if (res.records.length == 0) return undefined
            return new Marker(res.records[0].get('m'))
        })
    }
    getPath(markerID: string, endPointID: string): Promise<Connector[] | undefined> {
        return this.neo4jService.read(`
        MATCH (m:Marker {id: $markerID}),
            (e:EndPoint {id: $endPointID}),
            p = shortestPath((m)-[*]-(e))
        WHERE length(p) > 1
        RETURN p
        `, {
            markerID,
            endPointID
        }).then((res) => {
            if (res.records.length == 0) return undefined
            return res.records.map(row => new Connector(row.get('p')))
        });
    }
    getAllEndPoint(markerID: string): Promise<EndPoint[] | undefined> {
        return this.neo4jService.read(`
        MATCH (m:Marker{id:$markerID})-[*]->(e:EndPoint)
        RETURN e`, { markerID }).then((res) => {
            if (res.records.length == 0) return undefined
            return res.records.map(row => new EndPoint(row.get('e')))

        })
    }
   
}
