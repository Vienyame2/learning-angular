import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

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
  public formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
    });
  }

  public onSaveTodo() {

  }
}
