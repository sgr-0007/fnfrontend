import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalledgermasterComponent } from './normalledgermaster.component';

describe('NormalledgermasterComponent', () => {
  let component: NormalledgermasterComponent;
  let fixture: ComponentFixture<NormalledgermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalledgermasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalledgermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
