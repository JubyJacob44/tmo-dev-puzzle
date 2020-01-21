import * as wreck from '@hapi/wreck';
import { PQ_API_CONSTANTS } from './plugin.constants';

export async function getStockReportDetails(symbol, period, token) {
    try {
        const { payload } = await wreck.get(`${PQ_API_CONSTANTS.PQ_API_URL}${symbol}${PQ_API_CONSTANTS.PQ_API_URL_CHART}${period}${PQ_API_CONSTANTS.PQ_API_URL_TOKEN}${token}`);
        return payload.toString();
    } catch (error) {
        return error;
    }
}