import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EndPointCreateDTO } from 'src/dto/endPointCreate.dto';
import { EndPointUpdateDTO } from 'src/dto/endPointUpdate.dto';
import { EndPointService } from './end-point.service';

@Controller('end-point')
export class EndPointController {
    constructor(private readonly endPointService: EndPointService) { }
    @Get('/')
    async listMarker() {
        const endPoints = await this.endPointService.list();
        return {
            endPoints: endPoints.map(endPoint => endPoint.toJson())
        }
    }
    @Post('/')
    async createMarker(@Body() endPointCerateDTO: EndPointCreateDTO) {
        const endPoint = await this.endPointService.create(
            endPointCerateDTO.endPoint.longitude,
            endPointCerateDTO.endPoint.longitude,
            endPointCerateDTO.endPoint.name)
        return {
            endPoint: endPoint.toJson()
        }
    }
    @Put('/:id')
    async updateMarker(@Param('id') endPointID, @Body() endPointupdateDTO: EndPointUpdateDTO) {
        const endPoint = await this.endPointService.update(endPointID, endPointupdateDTO)
        if (!endPoint) return new NotFoundException()
        return {
            endPoint: endPoint.toJson()
        }
    }
    @Delete('/:id')
    async deleteMarker(@Param('id') endPointID) {
        const endPoint = await this.endPointService.remove(endPointID);
        if (!endPoint) throw new NotFoundException()
        return 'OK'
    }
}
