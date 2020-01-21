import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    it('should call fetchQuote', () => {
      spyOn(component, 'fetchQuote');
      component.isActive = true;
      component.stockPickerForm.setValue({symbol: 'GOOGL', period: '1m'});
      component.ngOnInit();
      component.stockPickerForm.valueChanges.subscribe(() => {
        expect(component.fetchQuote).toBeCalled();
      });
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
