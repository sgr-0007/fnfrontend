import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pettyreport2Component } from './pettyreport2.component';

describe('Pettyreport2Component', () => {
  let component: Pettyreport2Component;
  let fixture: ComponentFixture<Pettyreport2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pettyreport2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pettyreport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
