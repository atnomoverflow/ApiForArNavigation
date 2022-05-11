import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from 'src/entity/user.entiry';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly encryptionService: EncryptionService,
        private readonly jwtService:JwtService
    ) { }
    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email)
        if (user !== undefined && this.encryptionService.compare(password, user.getPassword())) {
            return user
        }
        return null
    }
    createToken(user:User){
        const{id,email,firstName,lastName}={id:user.getId(),email:user.getEmail(),firstName:user.getFirstName(),lastName:user.getLastName()}
        return {
            access_token:this.jwtService.sign({
                sub:id,
                email,firstName,lastName}),
        }
    }
}
