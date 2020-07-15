import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdilogComponent } from './taskdilog.component';

describe('TaskdilogComponent', () => {
  let component: TaskdilogComponent;
  let fixture: ComponentFixture<TaskdilogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskdilogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskdilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
