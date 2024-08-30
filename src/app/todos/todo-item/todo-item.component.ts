import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { TodoItem } from '../models/todo-item.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormField,
    MatInput,
    MatCheckbox,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit {
  @Output() public add = new EventEmitter<TodoItem>();

  public name = new FormControl<string>('', Validators.minLength(1));
  public isCompleted = new FormControl(false);
  public formGroup: FormGroup;
  @Input() todoItem!: TodoItem;

  constructor() {
    this.formGroup = new FormGroup({
      name: this.name,
      isCompleted: this.isCompleted
    });
  }

  public ngOnInit(): void {
    this.name.setValue(this.todoItem?.name);
    this.isCompleted.setValue(this.todoItem?.state === 'completed');
  }

  public onKeyDown(event: Event) {
      event.preventDefault();
      const formValue = this.formGroup.value;
      if (formValue.name.length > 0) {
        this.add.emit({
          id: crypto.randomUUID(),
          name: formValue.name,
          state: 'active',
          creationDate: new Date
        })
        this.formGroup.reset();
      }
  }
}
