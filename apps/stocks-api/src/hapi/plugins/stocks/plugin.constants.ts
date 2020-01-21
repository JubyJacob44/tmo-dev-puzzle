export const PQ_API_CONSTANTS = {
    PQ_API_PATH : '/api/stocks-report',
    PQ_API_METHOD: 'GET',
    PQ_API_URL: 'https://sandbox.iexapis.com/beta/stock/',
    PQ_API_URL_CHART: '/chart/',
    PQ_API_URL_TOKEN: '?token='    
}
export const PRICEQUERY_PLUGIN = {
    PLUGIN_NAME: 'priceQueryPlugIn',
    VERSION: '1.0.0',
}
export const CACHE_CONFIG = {
    CACHE_NAME: 'stocks',
    EXPIRE_TIME: 5 * 60 * 1000,
    TIMEOUT: 20000,
    FUNCTION_NAME: 'priceQuery'
}