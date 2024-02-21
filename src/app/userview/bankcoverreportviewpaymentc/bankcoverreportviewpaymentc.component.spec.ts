import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankcoverreportviewpaymentcComponent } from './bankcoverreportviewpaymentc.component';

describe('BankcoverreportviewpaymentcComponent', () => {
  let component: BankcoverreportviewpaymentcComponent;
  let fixture: ComponentFixture<BankcoverreportviewpaymentcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankcoverreportviewpaymentcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankcoverreportviewpaymentcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
