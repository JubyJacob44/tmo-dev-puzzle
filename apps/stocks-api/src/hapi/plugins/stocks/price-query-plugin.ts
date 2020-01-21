import { HapiServerPlugin } from '../../server/server-models';
import { PQ_API_CONSTANTS, PRICEQUERY_PLUGIN, CACHE_CONFIG } from './plugin.constants';
import { getStockReportDetails } from './plugin-service';

export const priceQueryPlugIn: HapiServerPlugin = {
    name: PRICEQUERY_PLUGIN.PLUGIN_NAME,
    version: PRICEQUERY_PLUGIN.VERSION,
    register: async function (server, options) {
        server.route({
            method: PQ_API_CONSTANTS.PQ_API_METHOD,
            path: PQ_API_CONSTANTS.PQ_API_PATH,
            handler: async function (request, h) {

                const { symbol, period } = request.query;
                return await server.methods.priceQuery(symbol, period, options.token);
            }
        });
        server.cache.provision({ provider: require('@hapi/catbox-memory'), name: CACHE_CONFIG.CACHE_NAME });
        server.method(CACHE_CONFIG.FUNCTION_NAME, stocksInfo, {
            cache: {
                expiresIn: CACHE_CONFIG.EXPIRE_TIME,
                generateTimeout: CACHE_CONFIG.TIMEOUT
            }
        });
    }
}
const stocksInfo = async (symbol, period, token) => {
    return getStockReportDetails(symbol, period, token);
};
