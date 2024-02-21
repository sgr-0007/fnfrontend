import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherreportviewComponent } from './voucherreportview.component';

describe('VoucherreportviewComponent', () => {
  let component: VoucherreportviewComponent;
  let fixture: ComponentFixture<VoucherreportviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherreportviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherreportviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
