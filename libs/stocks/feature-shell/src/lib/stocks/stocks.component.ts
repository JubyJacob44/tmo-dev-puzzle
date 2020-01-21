import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { subYears } from 'date-fns';
import { PriceQueryRequest } from '@coding-challenge/stocks/data-access-price-query';
import { STOCKS_CONSTANT } from '@coding-challenge/stocks/data-access-price-query';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  fromDate: Date;
  toDate: Date;
  maxDate: Date = new Date();
  minDate: Date = subYears(new Date(), 5);
  
  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {    
  }
  /*Since API doesn't support date range input,set the period as max*/
  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value; 
      const request: PriceQueryRequest = {symbol, period: STOCKS_CONSTANT.MAX, fromDate, toDate};
      this.priceQuery.fetchQuote(request);
    }
  }

  resetDate() {
    const { symbol, fromDate, toDate } = this.stockPickerForm.value;
    if(fromDate && toDate && fromDate > toDate){
      this.stockPickerForm.setValue({symbol: symbol, fromDate: toDate, toDate: toDate});
    }
  }
}
