import { computed, Injectable, signal } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { TodoListState } from './todo-list-state.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  public state = signal<TodoListState>({ items: [], count: 0 });

  constructor() { }

  public todoList = computed(() => this.state().items);
  public todoCount = computed(() => this.state().count);

  public add(item: TodoItem) {
    this.state.update(state => ({ ...state, items: [...state.items, item], count: state.count + 1 }));
  }
}
