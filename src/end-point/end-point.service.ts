import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { EndPoint } from 'src/entity/endPoint.entity';

@Injectable()
export class EndPointService {
    constructor(private readonly neo4jService: Neo4jService) { }
    list(): Promise<EndPoint[]> {
        return this.neo4jService.read(`MATCH (e:EndPoint) RETURN e`)
            .then(res => res.records.map(row => new EndPoint(row.get('e'))))
    }
    create(longitude: number, latitude: number, name: string): Promise<EndPoint> {
        return this.neo4jService.write(`
            CREATE(e:EndPoint{
                id: randomUUID(),
                longitude:$longitude,
                latitude:$latitude
                name:$name
            })return e`, {
            longitude,
            latitude,
            name
        }).then(
            ({ records }) => new EndPoint(records[0].get('e'))
        );
    }
    update(endPointID: string, updates: Record<string, any>): Promise<EndPoint | undefined> {
        return this.neo4jService.write(`MATCH(e:EndPoint{id:$endPointID}
    e+=$updates
    return e
    )`,
            {
                endPointID,
                updates
            }).then(
                res => {
                    if (res.records.length == 0) return undefined
                    return new EndPoint(res.records[0].get('e'))
                }
            )
    }
    remove(endPointID: string): Promise<Boolean> {
        return this.neo4jService.write(`
        MATCH(e:EndPoint{id:$endPointID})
        DETATCH DELETE e
        Return e
        `,
            {
                endPointID
            }).then(
                (res) => {
                    return (res.records.length == 1)
                }
            )
    }
}
