import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrnotevoucherComponent } from './drnotevoucher.component';

describe('DrnotevoucherComponent', () => {
  let component: DrnotevoucherComponent;
  let fixture: ComponentFixture<DrnotevoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrnotevoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrnotevoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
