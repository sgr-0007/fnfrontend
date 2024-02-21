import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrnotevoucherComponent } from './crnotevoucher.component';

describe('CrnotevoucherComponent', () => {
  let component: CrnotevoucherComponent;
  let fixture: ComponentFixture<CrnotevoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrnotevoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrnotevoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
