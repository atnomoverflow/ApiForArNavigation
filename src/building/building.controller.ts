import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Neo4jTypeInterceptor } from 'nest-neo4j/dist';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BuidlingCreateDTO } from 'src/dto/buildingCreate.dto';
import { BuidlingUpdateDTO } from 'src/dto/buildingUpdate.dto';
import { BuildingService } from './building.service';

@UseInterceptors(Neo4jTypeInterceptor)
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async listMarker() {
    const buildings = await this.buildingService.list();
    return {
      buildings: buildings.map((building) => building.toJson()),
    };
  }
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createMarker(@Body() buildingDTO: BuidlingCreateDTO) {

    const building = await this.buildingService.create(
      buildingDTO.longitude,
      buildingDTO.latitude,
      buildingDTO.name,
      buildingDTO.adress,
    );
    return {
      building: building.toJson(),
    };
  }
  @Put('/:id')
  async updateMarker(
    @Param('id') buildingID,
    @Body() buildingUpdateDTO: BuidlingUpdateDTO,
  ) {
    const building = await this.buildingService.update(
      buildingID,
      buildingUpdateDTO,
    );
    if (!building) return new NotFoundException();
    return {
      building: building.toJson(),
    };
  }
  @Delete('/:id')
  async deleteMarker(@Param('id') buildingID) {
    const building = await this.buildingService.remove(buildingID);

    if (!building) throw new NotFoundException();
    return 'OK';
  }
}
