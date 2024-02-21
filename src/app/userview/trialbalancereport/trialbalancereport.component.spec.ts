import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialbalancereportComponent } from './trialbalancereport.component';

describe('TrialbalancereportComponent', () => {
  let component: TrialbalancereportComponent;
  let fixture: ComponentFixture<TrialbalancereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialbalancereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialbalancereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
