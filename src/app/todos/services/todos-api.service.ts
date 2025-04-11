import { inject, Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosApiService {
  private apiUrl = `http://localhost:3000/todos/`;
  private httpClient = inject(HttpClient);

  public add(todo: TodoItem):void{
    this.httpClient.post<TodoItem>(this.apiUrl, todo ).subscribe();
  }

  public getAll(): Observable<TodoItem[]> {
    return this.httpClient.get<TodoItem[]>(this.apiUrl);
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}${id}`);
  }
}
