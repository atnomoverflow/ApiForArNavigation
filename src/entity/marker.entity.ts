import { Node } from 'neo4j-driver'


export class Marker {
    constructor(
        private readonly marker: Node,
    ) {}
    getId(): string {
        return (<Record<string, any>> this.marker.properties).id
    }
    getLatitude(): string {
        return (<Record<string, any>> this.marker.properties).latitude
    }
    getLongitude(): string {
        return (<Record<string, any>> this.marker.properties).longitude
    }
    toJson(): Record<string, any> {
        return {
            ...this.marker.properties,
        }
    }
}