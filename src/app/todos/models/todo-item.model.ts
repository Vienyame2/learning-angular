export interface TodoItem {
  id: number;
  title: string;
  state: 'editing' | 'completed' | 'active' | 'deleted';
  creationDate: Date;
}
