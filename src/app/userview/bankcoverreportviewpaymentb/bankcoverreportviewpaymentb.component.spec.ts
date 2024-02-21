import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankcoverreportviewpaymentbComponent } from './bankcoverreportviewpaymentb.component';

describe('BankcoverreportviewpaymentbComponent', () => {
  let component: BankcoverreportviewpaymentbComponent;
  let fixture: ComponentFixture<BankcoverreportviewpaymentbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankcoverreportviewpaymentbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankcoverreportviewpaymentbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
