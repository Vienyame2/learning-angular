import { inject, Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TodosApiService {
    private apiUrl = `http://localhost:3000/todos/`;

    private readonly httpClient = inject(HttpClient);

    public add(todo: TodoItem): Observable<TodoItem[]> {
        return this.httpClient.post<TodoItem[]>(this.apiUrl, todo);
    }

    public getAll(): Observable<TodoItem[]> {
        return this.httpClient.get<TodoItem[]>(this.apiUrl);
    }

    public delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}${id}`);
    }

    public deleteAll(): Observable<void> {
        return this.httpClient.delete<void>(this.apiUrl);
    }

    public update(todo: TodoItem): Observable<void> {
        return this.httpClient.put<void>(`${this.apiUrl}${todo.id}`, todo);
    }
}
