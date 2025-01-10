import { Component, inject, OnInit } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-todo-item-information',
    imports: [MatDialogContent, MatDialogActions, MatButton, MatDialogClose, MatDialogTitle, DatePipe],
    templateUrl: './todo-item-information.component.html',
    styleUrl: './todo-item-information.component.scss',
})
export class TodoItemInformationComponent implements OnInit {
    readonly data = inject<TodoItem>(MAT_DIALOG_DATA);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    public onSubmit: (data: TodoItem) => void;
    public ngOnInit() {
        console.log(this.data);
        this.data['name'] = 'test name';
    }

    public onCancel() {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public submitItem(_data: TodoItem) {
        this.onSubmit(_data);
    }
}
