import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowertransComponent } from './growertrans.component';

describe('GrowertransComponent', () => {
  let component: GrowertransComponent;
  let fixture: ComponentFixture<GrowertransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowertransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowertransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
