import { IsEmail, IsNotEmpty, IsObject } from "class-validator";
import { Type } from "class-transformer";

export class UserCreateDTO{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
    firstName?:string;
    lastName?:string
}