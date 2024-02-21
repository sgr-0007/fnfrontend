import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginresetComponent } from './loginreset.component';

describe('LoginresetComponent', () => {
  let component: LoginresetComponent;
  let fixture: ComponentFixture<LoginresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
