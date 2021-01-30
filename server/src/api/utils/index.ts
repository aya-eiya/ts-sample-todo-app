import { Schedule, Todo, TodoRepository } from '../../domains';
import { DataSource } from 'apollo-datasource';

class TodoDataSource extends DataSource<any> implements TodoRepository{
  constructor(todoRepository: TodoRepository) {
    super();
    this.repo = todoRepository;
  }

  create(title: string, schedule: Schedule): Promise<Todo> {
    return this.repo.create(title,schedule);
  }
  readAll(): Promise<Todo[]> {
    return this.repo.readAll();
  }
  add(todo: Todo): Promise<Todo> {
    return this.repo.add(todo);
  }
  update(todo: Todo): Promise<Todo> {
    return this.repo.update(todo);
  }
  delete(todo: Todo): Promise<boolean> {
    return this.repo.delete(todo);
  }
  private repo;
}

export function toDataSource(todoRepository: TodoRepository) {
  return new TodoDataSource(todoRepository);
}