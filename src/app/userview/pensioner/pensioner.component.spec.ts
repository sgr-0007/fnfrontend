import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionerComponent } from './pensioner.component';

describe('PensionerComponent', () => {
  let component: PensionerComponent;
  let fixture: ComponentFixture<PensionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
