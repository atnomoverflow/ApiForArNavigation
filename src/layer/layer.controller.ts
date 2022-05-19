import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    NotFoundException,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
  import { Neo4jTypeInterceptor } from 'nest-neo4j/dist';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateLayerDTO } from 'src/dto/layerCreate.dto';
import { UpdateLayerDTO } from 'src/dto/layerUpdate.dto';
import { editFileName, imageFileFilter } from 'src/utils/fileUpload.utils';
import { LayerService } from './layer.service';

  
  @UseInterceptors(Neo4jTypeInterceptor)

@Controller('layer')
export class LayerController {
    constructor(private readonly layerService: LayerService) {}
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async listLayer( @Param('id') buildingID:string) {
      const layers = await this.layerService.list(buildingID);
      return {
        layers: layers.map((building) => building.toJson()),
      };
    }
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './files',
            filename: editFileName,
          }),
          fileFilter: imageFileFilter,
        }),
      )
    @Post('/:id')
    async createLayer( @Param('id') buildingID:string,@Body() layerDTO: CreateLayerDTO,@UploadedFile() file) {
        Logger.log(layerDTO)
      const layer = await this.layerService.create(
        parseInt(layerDTO.floorNumber),
        layerDTO.name,
        layerDTO.mapBoxTileSet,
        file.filename,
        buildingID
      );
      return {
        layer: layer.toJson(),
      };
    }
    @Put('/:id')
    async updateLayer(
      @Param('id') layerID,
      @Body() layerUpdateDTO: UpdateLayerDTO,
    ) {
      const layer = await this.layerService.update(
        layerID,
        layerUpdateDTO,
      );
      if (!layer) return new NotFoundException();
      return {
        layer: layer.toJson(),
      };
    }
    @Delete('/:id')
    async deleteLayer(@Param('id') layerID) {
      const layer = await this.layerService.remove(layerID);
  
      if (!layer) throw new NotFoundException();
      return 'OK';
    }
    @Get('/floorPlan/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
    }
}
