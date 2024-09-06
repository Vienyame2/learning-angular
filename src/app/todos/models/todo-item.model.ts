export interface TodoItem {
  id?: string;
  name: string;
  state: 'editing' | 'completed' | 'active' | 'deleted';
  creationDate: Date;
}
