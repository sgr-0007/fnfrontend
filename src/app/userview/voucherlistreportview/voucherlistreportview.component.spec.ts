import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherlistreportviewComponent } from './voucherlistreportview.component';

describe('VoucherlistreportviewComponent', () => {
  let component: VoucherlistreportviewComponent;
  let fixture: ComponentFixture<VoucherlistreportviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherlistreportviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherlistreportviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
