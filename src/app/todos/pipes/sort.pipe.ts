import { Pipe, PipeTransform, Signal } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { compareAsc, compareDesc } from 'date-fns';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    transform(todoItems: Signal<TodoItem>[], direction: 'asc' | 'desc' = 'asc'): Signal<TodoItem>[] {
        console.log(direction);
        if (direction === 'desc') {
            return todoItems.sort((a, b) => compareDesc(b().creationDate, a().creationDate));
        }

        return todoItems.sort((a, b) => compareAsc(b().creationDate, a().creationDate));
    }
}
