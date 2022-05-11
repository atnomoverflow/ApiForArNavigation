import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { identity } from 'rxjs';
import { UserCreateDTO } from 'src/dto/userCreate.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }
    @Post('register')
    async registerPost(@Body() userDTO: UserCreateDTO) {
        const user = await this.userService.createUser(
            userDTO.user.email,
            userDTO.user.password,
            userDTO.user.firstName,
            userDTO.user.lastName
        )
        return await this.authService.createToken(user)
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.createToken(req.user)
    }
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() req) {
        const { id, email, firstName, lastName } = { id: req.user.getId(), email: req.user.getEmail(), firstName: req.user.getFirstName(), lastName: req.user.getLastName() }

        return { id, email, firstName, lastName }
    }
}
