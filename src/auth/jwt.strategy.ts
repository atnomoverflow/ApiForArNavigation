import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entity/user.entiry";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService:ConfigService,
        private readonly userService:UserService
    ){
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: configService.get<string>('JWT_SECRET'),            }
        )
    }
    async validate(payload:any):Promise<User>{
            const user = await this.userService.findUserByEmail(payload.email)
            if(!user){
                throw new UnauthorizedException()
            }
            return user
    }
}