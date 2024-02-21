import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payreconview1Component } from './payreconview1.component';

describe('Payreconview1Component', () => {
  let component: Payreconview1Component;
  let fixture: ComponentFixture<Payreconview1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Payreconview1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Payreconview1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
