import { Node } from 'neo4j-driver'


export class Layer {
    constructor(
        private readonly layer: Node,
    ) {}
    getId(): string {
        return (<Record<string, any>> this.layer.properties).id
    }
    getFloorNumber(): number {
        return (<Record<string, any>> this.layer.properties).floorNumber
    }
    getName(): string {
        return (<Record<string, any>> this.layer.properties).name
    }
    getMapBoxTileSet(): string {
        return (<Record<string, any>> this.layer.properties).mapBoxTileSet
    }
    getFloorPlan(): string {
        return (<Record<string, any>> this.layer.properties).floorPlan
    }
    toJson(): Record<string, any> {
        return {
            ...this.layer.properties,
        }
    }
}