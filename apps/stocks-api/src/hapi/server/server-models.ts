import { Server, ServerOptions } from 'hapi';

export interface HapiServerPlugin {
    name: string;
    version: string;
    register(server: Server, options: any): Promise<void>;
}

export interface HapiServerOptions extends ServerOptions {
    port: number;
    host: string;
    address: string;
}

export interface HapiConfig {
    plugins: HapiServerPlugin[];
    configParameters: any;
}