import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-todo-actions',
    imports: [ReactiveFormsModule, MatCheckbox],
    templateUrl: './todo-actions.component.html',
    styleUrl: './todo-actions.component.scss',
})
export class TodoActionsComponent {}
