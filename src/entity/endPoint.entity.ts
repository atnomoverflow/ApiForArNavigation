import { Node } from 'neo4j-driver'


export class EndPoint {
    constructor(
        private readonly endPoint: Node,
    ) {}
    getId(): string {
        return (<Record<string, any>> this.endPoint.properties).id
    }
    getLatitude(): string {
        return (<Record<string, any>> this.endPoint.properties).latitude
    }
    getLongitude(): string {
        return (<Record<string, any>> this.endPoint.properties).longitude
    }
    getName(): string {
        return (<Record<string, any>> this.endPoint.properties).name
    }
    toJson(): Record<string, any> {
        return {
            ...this.endPoint.properties,
        }
    }
}