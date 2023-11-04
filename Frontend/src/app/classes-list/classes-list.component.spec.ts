import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesListComponent } from './classes-list.component';

describe('ClassesListComponent', () => {
  let component: ClassesListComponent;
  let fixture: ComponentFixture<ClassesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesListComponent]
    });
    fixture = TestBed.createComponent(ClassesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
