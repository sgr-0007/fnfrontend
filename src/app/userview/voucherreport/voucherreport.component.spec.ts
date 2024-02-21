import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherreportComponent } from './voucherreport.component';

describe('VoucherreportComponent', () => {
  let component: VoucherreportComponent;
  let fixture: ComponentFixture<VoucherreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
