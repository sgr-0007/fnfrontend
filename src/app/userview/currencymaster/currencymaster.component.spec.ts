import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencymasterComponent } from './currencymaster.component';

describe('CurrencymasterComponent', () => {
  let component: CurrencymasterComponent;
  let fixture: ComponentFixture<CurrencymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencymasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
