import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Neo4jService } from 'nest-neo4j/dist';
import { Building } from 'src/entity/building.entity';
import { User } from 'src/entity/user.entiry';

@Injectable({ scope: Scope.REQUEST })
export class BuildingService {
  constructor(
    private readonly neo4jService: Neo4jService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  list(): Promise<Building[]> {
    return this.neo4jService
      .read(`
      MATCH (b:Building)<-[:Own]-(:User{id:$userID})
      
      RETURN b`,{
          userID:(<User> this.request.user).getId()
      })
      .then((res) => res.records.map((row) => new Building(row.get('b'))));
  }
  create(
    longitude: number,
    latitude: number,
    name: string,
    adress: string,
  ): Promise<Building> {
    return this.neo4jService
      .write(
        `
        MATCH (u:User {id: $userId})
        WITH u, randomUUID() AS uuid
        CREATE(b:Building{
                id: randomUUID(),
                longitude:$longitude,
                latitude:$latitude,
                name:$name,
                adress:$adress
            })
            CREATE (u)-[:Own]->(b)
            return b`,
        {
            userId: (<User> this.request.user).getId(),
          longitude,
          latitude,
          name,
          adress,
        },
      )
      .then(({ records }) => new Building(records[0].get('b')));
  }
  update(
    buildingID: string,
    updates: Record<string, any>,
  ): Promise<Building | undefined> {
    return this.neo4jService
      .write(
        `
    MATCH(b:Building{id:$buildingID}
    b+=$updates
    return b
    )`,
        {
          buildingID,
          updates,
        },
      )
      .then((res) => {
        if (res.records.length == 0) return undefined;
        return new Building(res.records[0].get('b'));
      });
  }
  //TODO:add remove all layers and thier respective nodes
  remove(buildingID: string): Promise<Boolean> {
    return this.neo4jService
      .write(
        `
        MATCH(b:EndPoint{id:$buildingID})
        DETATCH DELETE b
        Return b
        `,
        {
          buildingID,
        },
      )
      .then((res) => {
        return res.records.length == 1;
      });
  }
}
