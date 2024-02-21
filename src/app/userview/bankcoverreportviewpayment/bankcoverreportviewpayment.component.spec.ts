import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankcoverreportviewpaymentComponent } from './bankcoverreportviewpayment.component';

describe('BankcoverreportviewpaymentComponent', () => {
  let component: BankcoverreportviewpaymentComponent;
  let fixture: ComponentFixture<BankcoverreportviewpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankcoverreportviewpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankcoverreportviewpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
