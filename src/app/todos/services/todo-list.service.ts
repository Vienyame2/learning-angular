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
    item.id = crypto.randomUUID();
    this.state.update(state => ({ ...state, items: [...state.items, item], count: state.count + 1 }));
  }

  public update(todoItem: TodoItem) {
    const updatedList = this.state().items.map(item => {
      if(item.id === todoItem.id) {
        return todoItem;
      }
      return item;
    });

    this.state.update((state) => ({
        ...state, items: [...updatedList]
    }))
  }
}
