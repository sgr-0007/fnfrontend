import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybcoverComponent } from './paybcover.component';

describe('PaybcoverComponent', () => {
  let component: PaybcoverComponent;
  let fixture: ComponentFixture<PaybcoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaybcoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaybcoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
