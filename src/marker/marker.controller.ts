import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MarkerCreateDTO } from 'src/dto/markerCreate.dto';
import { MarkeUpdateDTO } from 'src/dto/markerUpdate.dto';
import { SeachPathDTO } from 'src/dto/searshPath.dto';
import { MarkerService } from './marker.service';

@Controller('marker')
export class MarkerController {
    constructor(private readonly markerService: MarkerService) { }
    @Get('/')
    async listMarker() {
        const markers = await this.markerService.list();
        return {
            markers: markers.map(marker => marker.toJson())
        }
    }

    @Post('/')
    async createMarker(@Body() markerDTO: MarkerCreateDTO) {
        const marker = await this.markerService.create(
            markerDTO.marker.longitude,
            markerDTO.marker.latitude)
        return {
            marker: marker.toJson()
        }
    }
    @Put('/:id')
    async updateMarker(@Param('id') markerID, @Body() markerupdateDTO: MarkeUpdateDTO) {
        const marker = await this.markerService.update(markerID, markerupdateDTO)
        if (!marker) return new NotFoundException()
        return {
            marker: marker.toJson()
        }
    }
    @Delete('/:id')
    async deleteMarker(@Param('id') markerID) {
        const marker = await this.markerService.remove(markerID);

        if (!marker) throw new NotFoundException()
        return 'OK'
    }
    
    @Post('/Path')
    async getPath(@Body() searshQuery: SeachPathDTO) {
        const path = await this.markerService.getPath(searshQuery.query.markerID, searshQuery.query.endPointID)

        if (!path) throw new NotFoundException()
        return {
            path: path.map(con=>con.toJson())
        }
    }
    @Post(':markerID/relation/:connectorID')
    async createStartRelation(@Param('markerID') markerID, @Param('connectorID') connectorID) {
        const marker = await this.markerService.start(markerID, connectorID)
        if (!marker) throw new NotFoundException()
        return {
            marker: marker.toJson()
        }
    }
    @Get('/:id')
    async getDetail(@Param('id') makerID){
        const marker=await this.markerService.detatil(makerID)
        if (!marker) throw new NotFoundException()
        return {
            marker: marker.toJson()
        }
    }
    @Get('/endpoints/:id')
    async getAllEndPointForMarker(@Param('id') markerID) {
        const endPoints = await this.markerService.getAllEndPoint(markerID);
        if (!endPoints) throw new NotFoundException()
        return {
            endPoints: endPoints.map(endPoint => endPoint.toJson())
        }
    }
}
