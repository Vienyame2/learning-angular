import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { TodoListState } from './todo-list-state.model';
import { TodosApiService } from './todos-api.service';

@Injectable({
    providedIn: 'root',
})
export class TodoListService {
    private todosApi = inject(TodosApiService);
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

    public todoList = computed(() =>
        this.state()
            .items.filter(item => item.status !== 'completed')
            .map(item => signal(item)),
    );
    public completedTodos = computed(() =>
        this.state()
            .items.filter(item => item.status === 'completed')
            .map(item => signal(item)),
    );
    public todoCount = computed(() => this.state().count);

    public add(item: TodoItem) {
        item.id = crypto.randomUUID();
        this.state.update(state => ({ ...state, items: [...state.items, item], count: state.count + 1 }));
        this.todosApi.add(item);
    }

    public update(todoItem: TodoItem) {
        const updatedList = this.state().items.map(item => {
            if (item.id === todoItem.id) {
                return todoItem;
            }
            return item;
        });

        this.state.update(state => ({
            ...state,
            items: [...updatedList],
        }));
    }

    public delete(id: string) {
        this.todosApi.delete(id).subscribe(() => this.todosList.reload());
    }

    public complete(todoItem: TodoItem) {
        this.update(todoItem);
    }
}
