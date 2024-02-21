import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsschComponent } from './bssch.component';

describe('BsschComponent', () => {
  let component: BsschComponent;
  let fixture: ComponentFixture<BsschComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsschComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsschComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
