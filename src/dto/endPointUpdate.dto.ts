
import { IsNotEmpty, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

 class EndPoint{
    @IsNotEmpty()
    latitude?:number;
    @IsNotEmpty()
    longitude?:number;
    @IsNotEmpty()
    name?:string;
    
}
export class EndPointUpdateDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => EndPoint)
    endPoint: EndPoint;
}