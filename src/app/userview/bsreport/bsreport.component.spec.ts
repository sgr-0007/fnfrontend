import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsreportComponent } from './bsreport.component';

describe('BsreportComponent', () => {
  let component: BsreportComponent;
  let fixture: ComponentFixture<BsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
