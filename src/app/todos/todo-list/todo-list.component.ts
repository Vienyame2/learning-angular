import { Component, computed, inject, Signal, ViewChild } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListService } from '../services/todo-list.service';
import { TodoItem } from '../models/todo-item.model';
import { MatDivider } from '@angular/material/divider';
import { MatBadge } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { TodoItemInformationComponent } from '../todo-item-information/todo-item-information.component';

@Component({
    selector: 'app-todo-list',
    imports: [TodoItemComponent, ReactiveFormsModule, MatDivider, MatBadge],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
    @ViewChild('addTodoItem')
    public todoItemRef!: TodoItemComponent;

    public todoService = inject(TodoListService);
    private dialog = inject(MatDialog);

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

    public onEditItem($event: TodoItem) {
        this.onOpenDialog($event);
    }

    public onOpenDialog(todoItem: TodoItem) {
        const ref = this.dialog.open(TodoItemInformationComponent, {
            data: todoItem,
            height: '99%',
            width: '350px',
            position: { right: '5px', top: '5px' },
        });

        ref.componentInstance.submitItem = (data: TodoItem) => this.submitData(data);
    }

    public submitData(data: TodoItem) {
        console.log(data);
        this.onSaveItem(data);
    }
}
