import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditlimitsComponent } from './creditlimits.component';

describe('CreditlimitsComponent', () => {
  let component: CreditlimitsComponent;
  let fixture: ComponentFixture<CreditlimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditlimitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditlimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
