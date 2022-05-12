import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkerService } from './marker/marker.service';
import { MarkerModule } from './marker/marker.module';
import { Neo4jConfig, Neo4jModule } from 'nest-neo4j/dist';
import { ConnectorModule } from './connector/connector.module';
import { EndPointModule } from './end-point/end-point.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EncryptionModule } from './encryption/encryption.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BuildingModule } from './building/building.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Neo4jModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService, ],
      useFactory: (configService: ConfigService) : Neo4jConfig => ({
        scheme: configService.get('NEO4J_SCHEME'),
        host: configService.get('NEO4J_HOST'),
        port: configService.get('NEO4J_PORT'),
        username: configService.get('NEO4J_USERNAME'),
        password: configService.get('NEO4J_PASSWORD'),
        database: configService.get('NEO4J_DATABASE'),
      })
    }), MarkerModule, ConnectorModule, EndPointModule, UserModule, AuthModule, EncryptionModule, BuildingModule],
  controllers: [AppController],
  providers: [AppService, MarkerService],
})
export class AppModule {}
