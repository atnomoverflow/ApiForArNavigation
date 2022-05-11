import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from 'src/entity/user.entiry';

@Injectable()
export class UserService {
    constructor(
        private readonly neo4jService: Neo4jService,
        private readonly encryptionService:EncryptionService    
    ) { }
    async createUser(email: string, password: string, firstName?: string, lastName?: string): Promise<User> {
        return await this.neo4jService.write(`
        CREATE(user:User)
        SET user += $proprities,user.id=randomUUID()
        RETURN user
        `, {
            proprities: {
                email,
                password:await this.encryptionService.hash(password),
                firstName,
                lastName
            }
        }).then(
            (res)=> new User(res.records[0].get('user')) )
        
    }
    async findUserByEmail(email:string):Promise<User|undefined>{
        return await this.neo4jService.read(`
        Match(u:User{email:$email})
        return u
        `,{
            email
        })
        .then(
            (res)=>{
            return res.records.length==1? new User(res.records[0].get('u')):undefined 
            }
        )
    }
}
