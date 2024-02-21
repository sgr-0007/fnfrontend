import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeexpensereportviewerComponent } from './incomeexpensereportviewer.component';

describe('IncomeexpensereportviewerComponent', () => {
  let component: IncomeexpensereportviewerComponent;
  let fixture: ComponentFixture<IncomeexpensereportviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeexpensereportviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeexpensereportviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
