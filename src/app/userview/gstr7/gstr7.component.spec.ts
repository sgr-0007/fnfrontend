import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gstr7Component } from './gstr7.component';

describe('Gstr7Component', () => {
  let component: Gstr7Component;
  let fixture: ComponentFixture<Gstr7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gstr7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gstr7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
