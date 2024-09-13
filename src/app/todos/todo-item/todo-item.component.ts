import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { TodoItem } from '../models/todo-item.model';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormField,
    MatInput,
    MatCheckbox,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit {
  @Output()
  public save = new EventEmitter<TodoItem>();

  @Output()
  public delete = new EventEmitter<string>();

  @ViewChild('addTodoItemInput') public todoItemRef!: ElementRef;

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
        this.save.emit({
          id: this.todoItem?.id,
          name: formValue.name,
          state: this.todoItem?.state || 'active',
          creationDate: this.todoItem?.creationDate || new Date
        })

        if (!this.todoItem) {
          this.name.reset();
        }
      }
  }

  public focus(){
    this.todoItemRef.nativeElement.focus();
  }

  public onDelete() {
    this.delete.emit(this.todoItem.id);
  }

}
