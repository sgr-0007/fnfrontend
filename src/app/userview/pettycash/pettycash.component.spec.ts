import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettycashComponent } from './pettycash.component';

describe('PettycashComponent', () => {
  let component: PettycashComponent;
  let fixture: ComponentFixture<PettycashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettycashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PettycashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
