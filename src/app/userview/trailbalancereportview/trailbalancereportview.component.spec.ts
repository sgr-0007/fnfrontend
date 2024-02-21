import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailbalancereportviewComponent } from './trailbalancereportview.component';

describe('TrailbalancereportviewComponent', () => {
  let component: TrailbalancereportviewComponent;
  let fixture: ComponentFixture<TrailbalancereportviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailbalancereportviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailbalancereportviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
