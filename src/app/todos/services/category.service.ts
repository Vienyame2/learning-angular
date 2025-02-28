import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    categories = signal([
        { id: 1, name: 'Red', color: 'red' },
        { id: 2, name: 'Green', color: 'green' },
        { id: 3, name: 'Orange', color: 'orange' },
    ]);

    constructor() {}
}
