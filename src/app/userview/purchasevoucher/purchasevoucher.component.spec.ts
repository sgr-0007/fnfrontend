import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasevoucherComponent } from './purchasevoucher.component';

describe('PurchasevoucherComponent', () => {
  let component: PurchasevoucherComponent;
  let fixture: ComponentFixture<PurchasevoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasevoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasevoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
