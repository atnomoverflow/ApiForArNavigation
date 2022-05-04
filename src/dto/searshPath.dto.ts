import { IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class SeachPath{
    @IsNotEmpty()
    markerID:string;
    @IsNotEmpty()
    endPointID:string;
    
}
export class SeachPathDTO{
    @IsObject()
    @ValidateNested()
    @Type(() => SeachPath)
    query: SeachPath;
}