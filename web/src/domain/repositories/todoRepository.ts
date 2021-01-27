import { Todo } from '../models/todo';

export interface TodoRepository {
  readAll(): Promise<Todo[]>;
  create(): Promise<Todo>;
  add(todo: Todo): Promise<Todo>;
  update(todo: Todo): Promise<Todo>;
  delete(todo: Todo): Promise<boolean>;
}