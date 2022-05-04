import { Node } from 'neo4j-driver'


export class Connector {
    constructor(
        private readonly connector: Node,
    ) {}
    getId(): string {
        return (<Record<string, any>> this.connector.properties).id
    }
    getLatitude(): string {
        return (<Record<string, any>> this.connector.properties).latitude
    }
    getLongitude(): string {
        return (<Record<string, any>> this.connector.properties).longitude
    }
    toJson(): Record<string, any> {
        return {
            ...this.connector.properties,
        }
    }
}