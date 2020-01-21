import * as Hapi from 'hapi';
import { HapiServerOptions, HapiConfig, HapiServerPlugin } from './server-models';

export class HapiService {
    server: Hapi.Server;

    constructor(
        public defaultServerOptions: HapiServerOptions
    ) { }

    async start(hapiConfig: HapiConfig) {  
        this.server = new Hapi.Server(this.defaultServerOptions);
        const config = hapiConfig.configParameters;
        const pluginsRegistered: Promise<void>[] = hapiConfig.plugins.reduce(
            (response: Promise<void>[], plugin: HapiServerPlugin) => {
            
            response.push(this.server.register({
                plugin: plugin,
                options: config
            }));
            return response;
            
        },[]);

        await Promise.all(pluginsRegistered);
        await this.startServerInstance(); 
    }
    startServerInstance() {
        return this.server.start();
    }    
}