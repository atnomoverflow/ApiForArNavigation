
import {  ValidateNested, IsObject, IsOptional } from "class-validator";
import { Type } from "class-transformer";

 class Connector{
    @IsOptional()
    latitude?:number;
    @IsOptional()
    longitude?:number;
    
}
export class ConnectorUpdateDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Connector)
    marker: Connector;
}