import { Node } from 'neo4j-driver'


export class Building {
    constructor(
        private readonly building: Node,
    ) {}
    getId(): string {
        return (<Record<string, any>> this.building.properties).id
    }
    getName(): string {
        return (<Record<string, any>> this.building.properties).name
    }
    getAdress(): string {
        return (<Record<string, any>> this.building.properties).adress
    }
    getLatitude(): string {
        return (<Record<string, any>> this.building.properties).latitude
    }
    getLongitude(): string {
        return (<Record<string, any>> this.building.properties).longitude
    }
    toJson(): Record<string, any> {
        return {
            ...this.building.properties,
        }
    }
}