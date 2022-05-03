import { Inject, Injectable } from '@nestjs/common';
import neo4j,{ Driver, Session, Result } from 'neo4j-driver'
import { Neo4jConfig } from 'src/neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';

@Injectable()
export class Neo4jService {
    constructor(
        @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
        @Inject(NEO4J_DRIVER) private readonly driver:Driver
    ) { }
    getConfig(): Neo4jConfig {
        return this.config;
    }
    getDriver(): Driver {
        return this.driver;
    }
    getReadSession(database?: string): Session {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j.session.READ,
        })
    }
    getWriteSession(database?: string): Session {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j.session.WRITE,
        })
    }
    read(cypher:string ,parm:Record<string,any>,database?:string):Result{
        const session= this.getReadSession();
        return session.run(cypher,parm);
    }
    write(cypher:string ,parm:Record<string,any>,database?:string):Result{
        const session= this.getReadSession();
        return session.run(cypher,parm);
    }

}
