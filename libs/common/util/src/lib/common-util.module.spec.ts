import { async, TestBed } from '@angular/core/testing';
import { CommonUtilModule } from './common-util.module';

describe('CommonUtilModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUtilModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUtilModule).toBeDefined();
  });
});
