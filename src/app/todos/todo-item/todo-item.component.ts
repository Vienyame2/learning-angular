import {
    Component,
    DestroyRef,
    effect,
    ElementRef,
    EventEmitter,
    inject,
    input,
    InputSignal,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { TodoItem } from '../models/todo-item.model';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-todo-item',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatCheckbox, MatIcon, MatIconButton, NgClass],
    templateUrl: './todo-item.component.html',
    styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent implements OnInit {
    @ViewChild('addTodoItemInput')
    public todoItemRef!: ElementRef;

    @Output()
    public save = new EventEmitter<TodoItem>();

    @Output()
    public edit = new EventEmitter<TodoItem>();

    @Output()
    public delete = new EventEmitter<string>();

    @Output()
    public terminate = new EventEmitter<TodoItem>();

    public todoItem: InputSignal<TodoItem | undefined> = input();

    public name = new FormControl<string | undefined>('', Validators.minLength(1));
    public isCompleted = new FormControl(false);
    public formGroup: FormGroup;
    public inputStatus = {
        isEditing: false,
        isEdited: false,
    };

    public displayActionButtons = false;
    private destroyed$ = inject(DestroyRef);

    constructor() {
        this.formGroup = new FormGroup({
            name: this.name,
            isCompleted: this.isCompleted,
        });

        effect(() => {
            this.name.setValue(this.todoItem()?.name);
        });
    }

    public ngOnInit(): void {
        this.name.setValue(this.todoItem()?.name);
        this.isCompleted.setValue(this.todoItem()?.state === 'completed');
        this.isCompleted.valueChanges.subscribe(value => {
            // this.todoItem().state = value ? 'completed' : 'active';
            // this.terminate.emit(this.todoItem());
        });

        this.name.valueChanges.subscribe(() => {
            // if (this.todoItem() && this.todoItem()?.id) {
            //     this.todoItem().state = 'editing';
            // }
            this.inputStatus.isEditing = true;
        });
    }

    public onKeyDown(event: KeyboardEvent) {
        if (event.key.toLowerCase() === 'enter') {
            this.sendItem();
            if (this.todoItem()?.id) {
                this.inputStatus.isEdited = true;
                timer(1000)
                    .pipe(takeUntilDestroyed(this.destroyed$))
                    .subscribe(() => {
                        this.inputStatus.isEdited = false;
                    });
            }
            return;
        }
    }

    public sendItem() {
        const formValue = this.formGroup.value;
        if (formValue.name?.length > 0) {
            this.save.emit({
                id: this.todoItem()?.id,
                name: formValue.name,
                state: this.todoItem()?.state || 'active',
                creationDate: this.todoItem()?.creationDate || new Date(),
            });

            if (!this.todoItem()) {
                this.name.reset();
            }
        }
    }

    public focus() {
        this.todoItemRef.nativeElement.focus();
    }

    public onDelete() {
        this.delete.emit(this.todoItem()?.id);
    }

    public onFocusOut() {
        this.inputStatus.isEditing = false;
    }

    public editItem() {
        this.edit.emit(this.todoItem());
    }
}
