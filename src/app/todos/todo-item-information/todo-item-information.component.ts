import { Component, inject, OnInit } from '@angular/core';
import { Category, TodoItem, TodoStatus } from '../models/todo-item.model';
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
import { MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatOption, MatSelect } from '@angular/material/select';
import { CategoryService } from '../services/category.service';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface TodoItemForm {
    name: FormControl<string>;
    status: FormControl<TodoStatus>;
    creationDate: FormControl<Date>;
    endDate: FormControl<Date | undefined>;
    description: FormControl<string | undefined>;
    category: FormControl<Category | undefined>;
    favorite: FormControl<boolean | undefined>;
}

@Component({
    selector: 'app-todo-item-information',
    providers: [provideNativeDateAdapter()],
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatLabel,
        MatDialogClose,
        MatDialogTitle,
        ReactiveFormsModule,
        MatInput,
        MatIcon,
        MatGridTile,
        MatGridList,
        MatIconButton,
        MatSelect,
        MatOption,
        MatHint,
        MatFormFieldModule,
        MatDatepickerModule,
        MatDatepickerToggle,
        MatNativeDateModule,
    ],
    templateUrl: './todo-item-information.component.html',
    styleUrl: './todo-item-information.component.scss',
})
export class TodoItemInformationComponent implements OnInit {
    readonly data = inject<TodoItem>(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<TodoItemInformationComponent, TodoItem>);
    categoryService = inject(CategoryService);
    categories = this.categoryService.categories.asReadonly();
    todoItemForm = new FormGroup<TodoItemForm>({
        name: new FormControl(this.data.name, { nonNullable: true }),
        status: new FormControl(this.data.status, { nonNullable: true }),
        creationDate: new FormControl(this.data.creationDate, { nonNullable: true }),
        endDate: new FormControl(this.data.endDate, { nonNullable: true }),
        description: new FormControl(this.data.description, { nonNullable: true }),
        category: new FormControl(this.data.category, { nonNullable: true }),
        favorite: new FormControl(this.data.favorite, { nonNullable: true }),
    });

    public ngOnInit() {
        console.log(this.data);
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
