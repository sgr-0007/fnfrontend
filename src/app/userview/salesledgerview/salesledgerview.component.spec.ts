import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesledgerviewComponent } from './salesledgerview.component';

describe('SalesledgerviewComponent', () => {
  let component: SalesledgerviewComponent;
  let fixture: ComponentFixture<SalesledgerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesledgerviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesledgerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
