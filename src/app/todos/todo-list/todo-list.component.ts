import { Component, computed, inject, Signal, ViewChild } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListService } from '../services/todo-list.service';
import { TodoItem } from '../models/todo-item.model';
import { MatDivider } from '@angular/material/divider';
import { MatBadge } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { TodoItemInformationComponent } from '../todo-item-information/todo-item-information.component';
import { filter } from 'rxjs';
import { OrderByPipe } from '../pipes/sort.pipe';
import { TodoActionsComponent } from '../todo-actions/todo-actions.component';

@Component({
    selector: 'app-todo-list',
    imports: [
        TodoItemComponent,
        ReactiveFormsModule,
        MatDivider,
        MatBadge,
        OrderByPipe,
        FormsModule,
        TodoActionsComponent,
    ],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
    private readonly dialog = inject(MatDialog);

    private readonly todoService = inject(TodoListService);

    @ViewChild('addTodoItem')
    public todoItemRef!: TodoItemComponent;

    public selectAll = false;

    public todoList: Signal<Signal<TodoItem>[]> = this.todoService.todoList;

    public completedTodos: Signal<Signal<TodoItem>[]> = this.todoService.completedTodos;

    public todoCount: Signal<number> = this.todoService.todoCount;

    public todoCounter: Signal<{ active: number; completed: number; total: number }> = computed(() => ({
        total: this.todoCount(),
        active: this.todoCount() - this.completedTodos().length,
        completed: this.completedTodos().length,
    }));

    public onSaveItem(todoItem: TodoItem) {
        if (todoItem?.id) {
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
        ref.afterClosed()
            .pipe(filter(todoItem => !!todoItem))
            .subscribe((data: TodoItem) => this.submitData(data));
    }

    public submitData(data: TodoItem) {
        console.log(data);
        this.onSaveItem(data);
        console.log(this.todoList());
    }
}
