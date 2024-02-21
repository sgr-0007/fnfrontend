import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbsubledgerComponent } from './tbsubledger.component';

describe('TbsubledgerComponent', () => {
  let component: TbsubledgerComponent;
  let fixture: ComponentFixture<TbsubledgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbsubledgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TbsubledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
