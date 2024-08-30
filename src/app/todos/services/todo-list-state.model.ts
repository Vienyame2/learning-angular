import { TodoItem } from '../models/todo-item.model';

export interface TodoListState {
  items: TodoItem[];
  count: number;
}
