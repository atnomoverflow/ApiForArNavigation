import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkerService } from './marker/marker.service';
import { MarkerModule } from './marker/marker.module';
import { Neo4jModule } from 'nest-neo4j/dist';
import { ConnectorModule } from './connector/connector.module';
import { EndPointModule } from './end-point/end-point.module';

@Module({
  imports: [Neo4jModule.forRoot(
    {
      scheme:"neo4j",
      host:'localhost',
      port:7687,
      username:'neo4j',
      password:'Asefb@101'
    }
  ), MarkerModule, ConnectorModule, EndPointModule],
  controllers: [AppController],
  providers: [AppService, MarkerService],
})
export class AppModule {}
