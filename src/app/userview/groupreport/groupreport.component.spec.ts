import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupreportComponent } from './groupreport.component';

describe('GroupreportComponent', () => {
  let component: GroupreportComponent;
  let fixture: ComponentFixture<GroupreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
