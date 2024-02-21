import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payreconview2Component } from './payreconview2.component';

describe('Payreconview2Component', () => {
  let component: Payreconview2Component;
  let fixture: ComponentFixture<Payreconview2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Payreconview2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Payreconview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
