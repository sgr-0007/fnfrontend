import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherdetailsComponent } from './voucherdetails.component';

describe('VoucherdetailsComponent', () => {
  let component: VoucherdetailsComponent;
  let fixture: ComponentFixture<VoucherdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
