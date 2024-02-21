import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesvoucherComponent } from './salesvoucher.component';

describe('SalesvoucherComponent', () => {
  let component: SalesvoucherComponent;
  let fixture: ComponentFixture<SalesvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesvoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
