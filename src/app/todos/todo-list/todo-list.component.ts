import { Component, ElementRef, inject, Signal, ViewChild } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { TodoListService } from '../services/todo-list.service';
import { TodoItem } from '../models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent,
    ReactiveFormsModule,
    MatFormField
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @ViewChild('addTodoItem')
  public todoItemRef!: TodoItemComponent;

  public todoService = inject(TodoListService);
  public todoList: Signal<TodoItem[]> = this.todoService.todoList;
  public todoCount: Signal<number> = this.todoService.todoCount;

  constructor() {

  }


  public onSaveItem(todoItem: TodoItem) {
    if(todoItem.id) {
      this.todoService.update(todoItem);
      this.todoItemRef.focus();
      return;
    }
    this.todoService.add(todoItem);
  }

  public onDeleteItem(id: string) {
    this.todoService.delete(id);
  }
}
