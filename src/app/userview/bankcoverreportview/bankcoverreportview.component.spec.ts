import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankcoverreportviewComponent } from './bankcoverreportview.component';

describe('BankcoverreportviewComponent', () => {
  let component: BankcoverreportviewComponent;
  let fixture: ComponentFixture<BankcoverreportviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankcoverreportviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankcoverreportviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
