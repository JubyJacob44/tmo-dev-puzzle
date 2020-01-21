import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { subDays } from 'date-fns';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQuery: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StocksComponent 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        FormBuilder, 
        {
          provide: PriceQueryFacade,
          useValue: {
            priceQueries$: {},
            fetchQuote: () => {}
          }
        }
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,        
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    priceQuery = TestBed.get(PriceQueryFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchQuote()', () => {
    it('should call fetchQuote of priceQuery', () => {
      spyOn(priceQuery, 'fetchQuote');
      component.stockPickerForm.setValue({symbol: 'GOOGL', fromDate: new Date(), toDate: new Date()});
      component.fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalled();
    });
    it('should not call fetchQuote of priceQuery', () => {
      spyOn(priceQuery, 'fetchQuote');
      component.stockPickerForm.setValue({symbol: null, fromDate: new Date(), toDate: new Date()});
      component.fetchQuote();
      expect(priceQuery.fetchQuote).not.toHaveBeenCalled();
    });
  });
  describe('resetDate()', () => {
    it('should set toDate to fromDate', () => {
      component.stockPickerForm.setValue({symbol: 'GOOGL', fromDate: new Date(), toDate: subDays(new Date(), 5)});
      component.resetDate();
      expect(component.stockPickerForm.controls.fromDate).not.toEqual(new Date());
    });
    it('should toDate should be greater than fromDate', () => {
      component.stockPickerForm.setValue({symbol: 'GOOGL', fromDate: subDays(new Date(),5), toDate: new Date()});
      component.resetDate();
      expect(component.stockPickerForm.controls.fromDate).not.toEqual(component.stockPickerForm.controls.toDate);
    });
  });
});
