import { IsEmail, IsNotEmpty, IsObject } from "class-validator";
import { Type } from "class-transformer";

export class User{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
    firstName?:string;
    lastName?:string
}
export class UserCreateDTO{
    @IsObject()
    @Type(() => User)
    user: User;
}