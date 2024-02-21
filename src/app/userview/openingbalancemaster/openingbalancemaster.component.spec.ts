import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningbalancemasterComponent } from './openingbalancemaster.component';

describe('OpeningbalancemasterComponent', () => {
  let component: OpeningbalancemasterComponent;
  let fixture: ComponentFixture<OpeningbalancemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningbalancemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningbalancemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
