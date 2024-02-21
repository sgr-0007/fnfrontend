import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbwoschComponent } from './tbwosch.component';

describe('TbwoschComponent', () => {
  let component: TbwoschComponent;
  let fixture: ComponentFixture<TbwoschComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbwoschComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TbwoschComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
