import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesuploadComponent } from './filesupload.component';

describe('FilesuploadComponent', () => {
  let component: FilesuploadComponent;
  let fixture: ComponentFixture<FilesuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
