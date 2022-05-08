import { Node } from 'neo4j-driver'


export class User {
    constructor(
        private readonly user: Node,
    ) {}
    getId(): string {
        return (<Record<string, any>> this.user.properties).id
    }
    getEmail(): string {
        return (<Record<string, any>> this.user.properties).email
    }
    getPassword(): string {
        return (<Record<string, any>> this.user.properties).password
    }
    getFirstName(): string {
        return (<Record<string, any>> this.user.properties).firstName
    }
    getLastName(): string {
        return (<Record<string, any>> this.user.properties).lastName
    }
    toJson(): Record<string, any> {
        return {
            ...this.user.properties,
        }
    }
}