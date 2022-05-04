
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

 class Connector{
    @IsNotEmpty()
    latitude?:number;
    @IsNotEmpty()
    longitude?:number;
    
}
export class ConnectorUpdateDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Connector)
    marker: Connector;
}