import { Module, OnModuleInit } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports:[EncryptionModule],
  exports:[UserService]
})
export class UserModule implements OnModuleInit{
  constructor(private readonly neo4jService:Neo4jService){}
  async onModuleInit() {
    await this.neo4jService.write('CREATE CONSTRAINT ON (c:User) ASSERT c.email IS UNIQUE', {}).catch(() => { })
  }
}
