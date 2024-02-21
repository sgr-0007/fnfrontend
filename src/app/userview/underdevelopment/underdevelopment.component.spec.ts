import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderdevelopmentComponent } from './underdevelopment.component';

describe('UnderdevelopmentComponent', () => {
  let component: UnderdevelopmentComponent;
  let fixture: ComponentFixture<UnderdevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderdevelopmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderdevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
