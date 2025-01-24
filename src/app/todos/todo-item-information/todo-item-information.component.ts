import { Component, inject, OnInit } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
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
    dialogRef = inject(MatDialogRef<TodoItemInformationComponent, TodoItem>);
    public ngOnInit() {
        console.log(this.data);
    }

    public onCancel() {}

    public submitItem(_data: TodoItem) {
        _data['name'] = 'New edited name';
        this.dialogRef.close(_data);
    }
}
