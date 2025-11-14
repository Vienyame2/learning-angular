import { Component, EventEmitter, model, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-todo-actions',
    imports: [ReactiveFormsModule, MatCheckbox, MatIcon, MatIconButton],
    templateUrl: './todo-actions.component.html',
    styleUrl: './todo-actions.component.scss',
})
export class TodoActionsComponent {
    public selectAll = model<boolean>();
    @Output() public deleteAll = new EventEmitter<boolean>();

    public updateSelectAll({ checked }: MatCheckboxChange) {
        this.selectAll.set(checked);
    }

    public deleteAllItems() {
        console.log('Delete all todos');
        this.deleteAll.emit(true);
    }
}
