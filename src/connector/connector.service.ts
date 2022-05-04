import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { Connector } from 'src/entity/connector.entity';

@Injectable()
export class ConnectorService {
    constructor(private readonly neo4jService: Neo4jService) { }
    list(): Promise<Connector[]> {
        return this.neo4jService.read(`MATCH (c:Connector) RETURN c`)
            .then(res => res.records.map(row => new Connector(row.get('c'))))
    }
    create(longitude: number, latitude: number): Promise<Connector> {
        return this.neo4jService.write(`
        CREATE(c:Connector{
            id: randomUUID(),
            longitude:$longitude,
            latitude:$latitude
        })return c`, {
            longitude
            , latitude
        }).then(
            ({ records }) => new Connector(records[0].get('c'))
        );
    }
    update(connectorID:string,updates: Record<string, any>):Promise<Connector|undefined>
    {
        return this.neo4jService.write(`
        MATCH(c:Marker{id:$connectorID}
        c+=$updates
        return c
        )`,
        {
        connectorID,
        updates
        }).then(
                res=>{
                    if (res.records.length == 0) return undefined
                    return  new Connector(res.records[0].get('c'))
                }
            )
    }
    remove(connectorID:string):Promise<Boolean>{
        return this.neo4jService.write(`
        MATCH(c:Connector{id:$connectorID})
        DETATCH DELETE c
        Return c
        `,
        {
            connectorID
        }).then(
            (res)=>{
                return (res.records.length == 1) 
            }
        )
    }
    createHasPathRelationship(connector1ID:string,connector2ID:string):Promise<Boolean>{
        return this.neo4jService.write(`
        CREATE(c1:Connector{id:$connector1ID})-[:HasPath]->(c2:Connector{id:$connector2ID})
        return c1
        `,
        {
            connector1ID,
            connector2ID
        }).then(
            (res)=>res.records.length > 0
        )
    }
    createEndRelationship(connectorID:string,endPointID:string):Promise<Boolean>{
        return this.neo4jService.write(`
        CREATE(c:Connector{id:$connectorID}-[:end]->(e:EndPoint{id:$endPointID}))
        return c
        `).then(
            (res) => res.records.length > 0
        )
    }
}
