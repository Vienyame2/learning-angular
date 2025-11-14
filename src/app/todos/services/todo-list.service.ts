import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { TodoListState } from './todo-list-state.model';
import { TodosApiService } from './todos-api.service';

@Injectable({
    providedIn: 'root',
})
export class TodoListService {
    private readonly todosApi = inject(TodosApiService);

    private todosList = resource({
        loader: async () => {
            const resp = await this.todosApi.getAll().toPromise();
            if (resp) {
                this.state.update(state => ({
                    ...state,
                    items: resp,
                    count: resp.length,
                }));
            }
        },
    });

    public state = signal<TodoListState>({ items: [], count: 0 });

    constructor() {}

    public todoList = computed(() => {
        return this.state()
            .items.filter(item => item.status !== 'completed')
            .map(item => signal(item));
    });

    public completedTodos = computed(() =>
        this.state()
            .items.filter(item => item.status === 'completed')
            .map(item => signal(item)),
    );
    public todoCount = computed(() => this.state().count);

    public add(item: TodoItem) {
        item.id = crypto.randomUUID();
        this.todosApi.add(item).subscribe(() => this.todosList.reload());
    }

    public update(todoItem: TodoItem) {
        this.todosApi.update(todoItem).subscribe(() => this.todosList.reload());
    }

    public delete(id: string) {
        this.todosApi.delete(id).subscribe(() => this.todosList.reload());
    }

    public deleteAll() {
        this.state().items.forEach((item, idx) => {
            if (item.id) {
                this.todosApi.delete(item.id).subscribe(() => {
                    if (idx === this.state().items.length - 1) {
                        this.todosList.reload();
                    }
                });
            }
        });
    }

    public complete(todoItem: TodoItem) {
        this.update(todoItem);
    }

    public selectAll(selectAll: boolean) {
        this.state.update(state => ({
            ...state,
            items: state.items
                .filter(item => item.status !== 'completed')
                .map(item => ({
                    ...item,
                    selected: selectAll,
                })),
        }));
    }
}
