
import {  ValidateNested, IsObject, IsOptional } from "class-validator";
import { Type } from "class-transformer";

 class Marker{
    @IsOptional()
    latitude?:number;
    @IsOptional()
    longitude?:number;
    
}
export class MarkeUpdateDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Marker)
    marker: Marker;
}