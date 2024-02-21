import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyertransformationComponent } from './buyertransformation.component';

describe('BuyertransformationComponent', () => {
  let component: BuyertransformationComponent;
  let fixture: ComponentFixture<BuyertransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyertransformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyertransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
