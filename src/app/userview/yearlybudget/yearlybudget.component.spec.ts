import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlybudgetComponent } from './yearlybudget.component';

describe('YearlybudgetComponent', () => {
  let component: YearlybudgetComponent;
  let fixture: ComponentFixture<YearlybudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlybudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlybudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
