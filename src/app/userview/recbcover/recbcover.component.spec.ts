import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecbcoverComponent } from './recbcover.component';

describe('RecbcoverComponent', () => {
  let component: RecbcoverComponent;
  let fixture: ComponentFixture<RecbcoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecbcoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecbcoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
