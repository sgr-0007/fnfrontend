import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionerfamComponent } from './pensionerfam.component';

describe('PensionerfamComponent', () => {
  let component: PensionerfamComponent;
  let fixture: ComponentFixture<PensionerfamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionerfamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionerfamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
