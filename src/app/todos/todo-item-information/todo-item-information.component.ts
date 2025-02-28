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
import { MatButton, MatIconButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatOption, MatSelect } from '@angular/material/select';
import { CategoryService } from '../services/category.service';

@Component({
    selector: 'app-todo-item-information',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatLabel,
        MatDialogClose,
        MatDialogTitle,
        ReactiveFormsModule,
        MatInput,
        MatFormField,
        MatIcon,
        MatGridTile,
        MatGridList,
        MatIconButton,
        MatSelect,
        MatOption,
    ],
    templateUrl: './todo-item-information.component.html',
    styleUrl: './todo-item-information.component.scss',
})
export class TodoItemInformationComponent implements OnInit {
    readonly data = inject<TodoItem>(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<TodoItemInformationComponent, TodoItem>);
    categoryService = inject(CategoryService);

    categories = this.categoryService.categories.asReadonly();

    todoItemForm = new FormGroup({
        name: new FormControl(this.data.name),
        state: new FormControl(this.data.status),
        creationDate: new FormControl(this.data.creationDate),
        endDate: new FormControl(this.data.endDate),
        description: new FormControl(this.data.description),
        category: new FormControl(this.data.category),
        favorite: new FormControl(this.data.favorite),
    });

    public ngOnInit() {
        console.log();
    }

    public onCancel() {}

    public submitItem() {
        console.log(this.todoItemForm.value);
        this.dialogRef.close({ ...this.data, ...this.todoItemForm.value });
    }

    onFavorite() {
        const status = this.todoItemForm.get('favorite')?.value;
        this.todoItemForm.patchValue({ favorite: !status });
    }
}
