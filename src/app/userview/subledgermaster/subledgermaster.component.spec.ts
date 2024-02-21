import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubledgermasterComponent } from './subledgermaster.component';

describe('SubledgermasterComponent', () => {
  let component: SubledgermasterComponent;
  let fixture: ComponentFixture<SubledgermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubledgermasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubledgermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
