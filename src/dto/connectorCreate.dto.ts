
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

 class Connector{
    @IsNotEmpty()
    latitude:number;
    @IsNotEmpty()
    longitude:number;
    
}
export class ConnectorCreateDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Connector)
    connector: Connector;
}