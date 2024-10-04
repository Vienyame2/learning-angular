import { Component, computed, inject, Signal, ViewChild } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { TodoListService } from '../services/todo-list.service';
import { TodoItem } from '../models/todo-item.model';
import { MatDivider } from '@angular/material/divider';
import { MatBadge } from '@angular/material/badge';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [TodoItemComponent, ReactiveFormsModule, MatFormField, MatDivider, MatBadge],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
    @ViewChild('addTodoItem')
    public todoItemRef!: TodoItemComponent;

    public todoService = inject(TodoListService);
    public todoList: Signal<TodoItem[]> = this.todoService.todoList;
    public completedTodos: Signal<TodoItem[]> = this.todoService.completedTodos;
    public todoCount: Signal<number> = this.todoService.todoCount;
    public todoCounter: Signal<{ active: number; completed: number; total: number }> = computed(() => ({
        total: this.todoCount(),
        active: this.todoCount() - this.completedTodos().length,
        completed: this.completedTodos().length,
    }));

    constructor() {}

    public onSaveItem(todoItem: TodoItem) {
        if (todoItem.id) {
            this.todoService.update(todoItem);
            this.todoItemRef.focus();
            return;
        }
        this.todoService.add(todoItem);
    }

    public onDeleteItem(id: string) {
        this.todoService.delete(id);
    }

    public onComplete($event: TodoItem) {
        this.todoService.complete($event);
    }
}
