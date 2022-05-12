import { Module, OnModuleInit } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { Neo4jService } from 'nest-neo4j/dist';

@Module({
  providers: [BuildingService],
  controllers: [BuildingController]
})
export class BuildingModule implements OnModuleInit {
  constructor(private readonly neo4jService:Neo4jService){}
  async onModuleInit() {
    await this.neo4jService.write('CREATE CONSTRAINT ON (b:Building) ASSERT b.id IS UNIQUE', {}).catch(() => { })

  }
}
