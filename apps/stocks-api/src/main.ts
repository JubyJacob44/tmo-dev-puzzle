import { startServer } from './hapi/server/server-util';
import { config } from './environments/environment';
import { HapiConfig } from './hapi/server/server-models';
import { priceQueryPlugIn } from './hapi/plugins/stocks/price-query-plugin';

const hapiPlugIn: HapiConfig = {    
    plugins: [priceQueryPlugIn],
    configParameters: config

}
startServer(hapiPlugIn);