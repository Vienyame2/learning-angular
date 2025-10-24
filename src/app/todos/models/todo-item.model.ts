export interface TodoItemLike {
    name: string;
    status: TodoStatus;
    creationDate: Date;
    endDate?: Date;
    description?: string;
    category?: Category;
    favorite?: boolean;
    selected?: boolean;
}

export type TodoStatus = 'editing' | 'completed' | 'active' | 'deleted';
export interface TodoItem extends TodoItemLike {
    id?: string | undefined;
}

export interface Category {
    id: string;
    color: string;
    name: string;
}
