export interface TodoItem {
    id?: string;
    name: string;
    status: 'editing' | 'completed' | 'active' | 'deleted';
    creationDate: Date;
    endDate?: Date;
    description?: string;
    category?: Category;
    favorite?: boolean;
}

export interface Category {
    id: string;
    color: string;
    name: string;
}
