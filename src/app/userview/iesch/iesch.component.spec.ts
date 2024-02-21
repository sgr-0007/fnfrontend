import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeschComponent } from './iesch.component';

describe('IeschComponent', () => {
  let component: IeschComponent;
  let fixture: ComponentFixture<IeschComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeschComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IeschComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
