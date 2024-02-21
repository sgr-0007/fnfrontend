import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgroupmasterComponent } from './subgroupmaster.component';

describe('SubgroupmasterComponent', () => {
  let component: SubgroupmasterComponent;
  let fixture: ComponentFixture<SubgroupmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubgroupmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
