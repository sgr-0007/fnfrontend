import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdisplayComponent } from './paymentdisplay.component';

describe('PaymentdisplayComponent', () => {
  let component: PaymentdisplayComponent;
  let fixture: ComponentFixture<PaymentdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentdisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
