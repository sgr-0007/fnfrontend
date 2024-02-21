import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaybookviewComponent } from './daybookview.component';

describe('DaybookviewComponent', () => {
  let component: DaybookviewComponent;
  let fixture: ComponentFixture<DaybookviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaybookviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaybookviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
