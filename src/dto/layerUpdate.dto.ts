import { IsOptional } from 'class-validator';
export class UpdateLayerDTO {
  @IsOptional()
  floorNumber: number;
  @IsOptional()
  name: string;
  @IsOptional()
  mapBoxTileSet: string;
}
