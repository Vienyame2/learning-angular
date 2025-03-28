import { inject, Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosApiService {
  private apiUrl = `http://localhost:3000/todos/`;
  private httpClient = inject(HttpClient);

  public add(todo: TodoItem):void{
    console.log(todo);
    this.httpClient.post<TodoItem>(this.apiUrl, todo ).subscribe();
  }
}
