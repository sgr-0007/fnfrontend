import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalenotetransComponent } from './salenotetrans.component';

describe('SalenotetransComponent', () => {
  let component: SalenotetransComponent;
  let fixture: ComponentFixture<SalenotetransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalenotetransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalenotetransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
