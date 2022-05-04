import { Module, OnModuleInit } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { Neo4jService } from 'nest-neo4j/dist';

@Module({
    providers: [MarkerService],
    controllers: [MarkerController]
})
export class MarkerModule implements OnModuleInit {
    constructor(private readonly neo4jService: Neo4jService) { }
    async onModuleInit() {
        await this.neo4jService.write('CREATE CONSTRAINT ON (m:Marker) ASSERT m.id IS UNIQUE', {}).catch(() => { })
    }
}
