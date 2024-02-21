import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbledgerreportComponent } from './cbledgerreport.component';

describe('CbledgerreportComponent', () => {
  let component: CbledgerreportComponent;
  let fixture: ComponentFixture<CbledgerreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbledgerreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbledgerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
