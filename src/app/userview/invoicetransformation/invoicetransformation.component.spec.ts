import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicetransformationComponent } from './invoicetransformation.component';

describe('InvoicetransformationComponent', () => {
  let component: InvoicetransformationComponent;
  let fixture: ComponentFixture<InvoicetransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicetransformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicetransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
