import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditlimitsettingComponent } from './creditlimitsetting.component';

describe('CreditlimitsettingComponent', () => {
  let component: CreditlimitsettingComponent;
  let fixture: ComponentFixture<CreditlimitsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditlimitsettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditlimitsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
