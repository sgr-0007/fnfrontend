import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaybooktransactionComponent } from './daybooktransaction.component';

describe('DaybooktransactionComponent', () => {
  let component: DaybooktransactionComponent;
  let fixture: ComponentFixture<DaybooktransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaybooktransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaybooktransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
