import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ConnectorCreateDTO } from 'src/dto/connectorCreate.dto';
import { ConnectorUpdateDTO } from 'src/dto/connectorUpdate.dto';
import { ConnectorService } from './connector.service';

@Controller('connector')
export class ConnectorController {

    constructor(private readonly connectorService: ConnectorService) { }
    @Get('/')
    async listMarker() {
        const connectors = await this.connectorService.list();
        return {
            connectors: connectors.map(connector => connector.toJson())
        }
    }

    @Post('/')
    async createMarker(@Body() connectorID: ConnectorCreateDTO) {
        const connector = await this.connectorService.create(
            connectorID.connector.longitude,
            connectorID.connector.latitude)
        return {
            connector: connector.toJson()
        }
    }
    @Put('/:id')
    async updateMarker(@Param('id') connectorID, @Body() connectorupdateDTO: ConnectorUpdateDTO) {
        const connector = await this.connectorService.update(connectorID, connectorupdateDTO)
        if (!connector) return new NotFoundException()
        return {
            connector: connector.toJson()
        }
    }
    @Delete('/:id')
    async deleteMarker(@Param('id') connectorID) {
        const marker = await this.connectorService.remove(connectorID);

        if (!marker) throw new NotFoundException()
        return 'OK'
    }
    @Post('/hasPath/:connector1/:connector2')
    async createHasPathRelationship(@Param('connector1') connector1ID, @Param('connector2') connector2ID) {
        const connector = await this.connectorService.createHasPathRelationship(connector1ID, connector2ID)

        if (!connector) throw new NotFoundException()
        return 'OK'
    }
    @Post('/end/:connector/:endPoint')
    async createEndRelationship(@Param('connector') connectorID, @Param('endPoint') endPointID) {
        const connector = await this.connectorService.createEndRelationship(connectorID, connectorID)
        if (!connector) throw new NotFoundException()
        return 'OK'
    }
}
