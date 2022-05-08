import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    EncryptionModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
          secret:configService.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn:configService.get<string>('JWT_EXPIRES_IN')
          }
      })
    })
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
