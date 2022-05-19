import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

import { Layer } from 'src/entity/layer.entity';


@Injectable()
export class LayerService {
  constructor(
    private readonly neo4jService: Neo4jService,
   
  ) {}
  list(buildingID:string): Promise<Layer[]> {
    return this.neo4jService
      .read(
        `
          MATCH (l:Layer)<-[:HAS_FLOOR]-(:Building{id:$buildingID})
          
          RETURN l`,
        {
            buildingID,
        },
      )
      .then((res) => res.records.map((row) => new Layer(row.get('l'))));
  }
  create(
    floorNumber: number,
    name: string,
    mapBoxTileSet: string,
    floorPlan: string,
    buildingId:string
  ): Promise<Layer> {
    return this.neo4jService
      .write(
        `
            MATCH (b:Building {id: $buildingId})
            WITH b, randomUUID() AS uuid
            CREATE(l:Layer{
                    id: randomUUID(),
                    name: $name,
                    mapBoxTileSet: $mapBoxTileSet,
                    floorPlan: $floorPlan,
                    buildingId:$buildingId,
                    floorNumber:$floorNumber
                })
                CREATE (b)-[:HAS_FLOOR]->(l)
                return l`,
        {
            floorNumber,
            name,
            mapBoxTileSet,
            floorPlan,
            buildingId
        },
      )
      .then(({ records }) =>  new Layer(records[0].get('l')));
  }
  update(
    layerID: string,
    updates: Record<string, any>,
  ): Promise<Layer | undefined> {
    return this.neo4jService
      .write(
        `
        MATCH(l:Layer{id:$layerID}
        l+=$updates
        return l
        )`,
        {
          layerID,
          updates,
        },
      )
      .then((res) => {
        if (res.records.length == 0) return undefined;
        return new Layer(res.records[0].get('l'));
      });
  }
  //TODO:add remove all node with the relation IN_FLOOR when this node is removed
  remove(layerID: string): Promise<Boolean> {
    return this.neo4jService
      .write(
        `
            MATCH(l:Layer{id:$layerID})
            DETACH DELETE l
            Return l
            `,
        {
            layerID,
        },
      )
      .then((res) => {
        return res.records.length == 1;
      });
  }
}
