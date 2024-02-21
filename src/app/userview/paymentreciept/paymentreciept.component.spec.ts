import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentrecieptComponent } from './paymentreciept.component';

describe('PaymentrecieptComponent', () => {
  let component: PaymentrecieptComponent;
  let fixture: ComponentFixture<PaymentrecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentrecieptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentrecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
