
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

 class Marker{
    @IsNotEmpty()
    latitude:number;
    @IsNotEmpty()
    longitude:number;
    
}
export class MarkerCreateDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => Marker)
    marker: Marker;
}