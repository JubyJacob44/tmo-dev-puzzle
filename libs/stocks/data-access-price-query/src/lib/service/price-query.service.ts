import { StocksAppConfigToken, StocksAppConfig } from '@coding-challenge/stocks/data-access-app-config';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PriceQueryService {
    constructor(@Inject(StocksAppConfigToken) private env: StocksAppConfig,
    private httpClient: HttpClient){};
    invokePriceQueryApi(symbol:string, period:string): Observable<any> {
        return this.httpClient.get(
            `${this.env.apiURL}${symbol}&period=${period}`
          );
    }
}
