import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQuery: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        FormBuilder, 
        {
          provide: PriceQueryFacade,
          useValue: {
            priceQueries$: of({ subscribe: () => {} }),
            priceQueryError$: of({ subscribe: () => {} }),
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
  describe('ngOnInit()', () => {
    it('should load', () => {
      component.ngOnInit();
    });
  });
  describe('fetchQuote()', () => {
    it('should call fetchQuote of priceQuery', () => {
      spyOn(priceQuery, 'fetchQuote');
      component.stockPickerForm.setValue({symbol: 'GOOGL', period: '1m'});
      component.fetchQuote();
      expect(priceQuery.fetchQuote).toHaveBeenCalled();
    });
    it('should not call fetchQuote of priceQuery', () => {
      spyOn(priceQuery, 'fetchQuote');
      component.stockPickerForm.setValue({symbol: null, period: '1m'});
      component.fetchQuote();
      expect(priceQuery.fetchQuote).not.toHaveBeenCalled();
    });
  });

});
