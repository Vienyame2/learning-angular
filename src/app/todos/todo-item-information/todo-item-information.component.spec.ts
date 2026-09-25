import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemInformationComponent } from './todo-item-information.component';

describe('TodoItemInformationComponent', () => {
  let component: TodoItemInformationComponent;
  let fixture: ComponentFixture<TodoItemInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
