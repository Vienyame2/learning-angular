import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TodoListComponent } from './todos/todo-list/todo-list.component';

@Component({
    selector: 'app-root',
    imports: [TodoListComponent],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './app.component.scss',
})
export class AppComponent {}
