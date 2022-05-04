import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EndPointService } from './end-point.service';
import { EndPointController } from './end-point.controller';
import { Neo4jService } from 'nest-neo4j/dist';

@Module({
  providers: [EndPointService],
  controllers: [EndPointController]
})
export class EndPointModule implements OnModuleInit{
  constructor(private readonly neo4jService:Neo4jService){}
  async onModuleInit() {
    await this.neo4jService.write('CREATE CONSTRAINT ON (e:Endpoint) ASSERT e.id IS UNIQUE', {}).catch(() => { })
  }
}
