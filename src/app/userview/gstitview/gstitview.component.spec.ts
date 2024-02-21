import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstitviewComponent } from './gstitview.component';

describe('GstitviewComponent', () => {
  let component: GstitviewComponent;
  let fixture: ComponentFixture<GstitviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstitviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstitviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
