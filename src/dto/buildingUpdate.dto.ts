import { IsOptional } from 'class-validator';

export class BuidlingUpdateDTO {
  @IsOptional()
  latitude?: number;
  @IsOptional()
  longitude?: number;
  @IsOptional()
  name?: string;
  @IsOptional()
  adress?: string;
}
