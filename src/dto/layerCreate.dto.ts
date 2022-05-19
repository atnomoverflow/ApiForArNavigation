import { IsNotEmpty } from "class-validator";
export class CreateLayerDTO {
  @IsNotEmpty()
  floorNumber: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  mapBoxTileSet: string;
}
