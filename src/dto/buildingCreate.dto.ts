
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

 export class BuidlingCreateDTO{
    @IsNotEmpty()
    latitude:number;
    @IsNotEmpty()
    longitude:number;
    @IsNotEmpty()
    name:string
    @IsNotEmpty()
    adress:string
}
