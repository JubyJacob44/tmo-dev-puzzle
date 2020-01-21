import { HapiServerOptions, HapiConfig } from './server-models';
import { HapiService } from './hapi-service';

export const defaultServerOptions: HapiServerOptions = {
    port: 3333,
    address: '0.0.0.0',
    host: 'localhost'
};

export async function startServer(hapiConfig: HapiConfig) {
    return new HapiService(defaultServerOptions).start(hapiConfig);
}