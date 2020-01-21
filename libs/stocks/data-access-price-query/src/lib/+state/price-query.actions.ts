import { Action } from '@ngrx/store';
import { PriceQueryResponse, PriceQueryRequest } from './price-query.type';


export enum PriceQueryActionTypes {
  SelectSymbol = '[Stocks Report] priceQuery.selectSymbol',
  FetchPriceQuery = '[Stocks Report] priceQuery.fetch',
  PriceQueryFetched = '[Stocks Report] priceQuery.fetched',
  PriceQueryFetchError = '[Stocks Report] priceQuery.error'
}

export class FetchPriceQuery implements Action {
  readonly type = PriceQueryActionTypes.FetchPriceQuery;
  constructor(public request: PriceQueryRequest) {}
}

export class PriceQueryFetchError implements Action {
  readonly type = PriceQueryActionTypes.PriceQueryFetchError;
  constructor(public error: any) {}
}

export class PriceQueryFetched implements Action {
  readonly type = PriceQueryActionTypes.PriceQueryFetched;
  constructor(public queryResults: PriceQueryResponse[]) {}
}

export class SelectSymbol implements Action {
  readonly type = PriceQueryActionTypes.SelectSymbol;
  constructor(public symbol: string) {}
}

export type PriceQueryAction =
  | FetchPriceQuery
  | PriceQueryFetched
  | PriceQueryFetchError
  | SelectSymbol;

export const fromPriceQueryActions = {
  FetchPriceQuery,
  PriceQueryFetched,
  PriceQueryFetchError,
  SelectSymbol
};
