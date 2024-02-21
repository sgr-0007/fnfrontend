import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pettyreport1Component } from './pettyreport1.component';

describe('Pettyreport1Component', () => {
  let component: Pettyreport1Component;
  let fixture: ComponentFixture<Pettyreport1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pettyreport1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pettyreport1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
