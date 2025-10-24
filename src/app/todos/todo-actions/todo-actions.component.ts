import { Component, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'app-todo-actions',
    imports: [ReactiveFormsModule, MatCheckbox],
    templateUrl: './todo-actions.component.html',
    styleUrl: './todo-actions.component.scss',
})
export class TodoActionsComponent {
    public selectAll = model<boolean>();

    public updateSelectAll({ checked }: MatCheckboxChange) {
        console.log(checked);
        this.selectAll.set(checked);
        console.log('Select All Toggled:', this.selectAll());
    }
}
