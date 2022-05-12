
import {  ValidateNested, IsObject, IsOptional } from "class-validator";
import { Type } from "class-transformer";

 class EndPoint{
    @IsOptional()
    latitude?:number;
    @IsOptional()
    longitude?:number;
    @IsOptional()
    name?:string;
    
}
export class EndPointUpdateDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => EndPoint)
    endPoint: EndPoint;
}