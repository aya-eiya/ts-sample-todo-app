import { Todo } from '../models/todo';

export interface TodoRepository {
  readAll(): Promise<Todo[]>;
  create(todo: Todo): Promise<Todo| undefined>;
  add(todo: Todo): Promise<Todo| undefined>;
  update(todo: Todo): Promise<Todo| undefined>;
  delete(todo: Todo): Promise<boolean>;
}