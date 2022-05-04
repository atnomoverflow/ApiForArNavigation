import { Module, OnModuleInit } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { ConnectorService } from './connector.service';
import { ConnectorController } from './connector.controller';

@Module({
  providers: [ConnectorService],
  controllers: [ConnectorController]
})
export class ConnectorModule implements OnModuleInit {
    constructor(private readonly neo4jService: Neo4jService) { }
    async onModuleInit() {
        await this.neo4jService.write('CREATE CONSTRAINT ON (c:Connector) ASSERT c.id IS UNIQUE', {}).catch(() => { })
    }
}
