import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';

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
export class TodoItemComponent {
  public name = new FormControl('');
  public isCompleted = new FormControl('');

  public onKeyDown(event: Event) {
      event.preventDefault();
      console.log('Enter key pressed');
  }
}
