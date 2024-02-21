import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchinfavourComponent } from './branchinfavour.component';

describe('BranchinfavourComponent', () => {
  let component: BranchinfavourComponent;
  let fixture: ComponentFixture<BranchinfavourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchinfavourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchinfavourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
