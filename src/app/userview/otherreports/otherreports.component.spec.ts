import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherreportsComponent } from './otherreports.component';

describe('OtherreportsComponent', () => {
  let component: OtherreportsComponent;
  let fixture: ComponentFixture<OtherreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
