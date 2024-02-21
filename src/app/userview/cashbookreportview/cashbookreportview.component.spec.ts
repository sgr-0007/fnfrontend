import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbookreportviewComponent } from './cashbookreportview.component';

describe('CashbookreportviewComponent', () => {
  let component: CashbookreportviewComponent;
  let fixture: ComponentFixture<CashbookreportviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashbookreportviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashbookreportviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
