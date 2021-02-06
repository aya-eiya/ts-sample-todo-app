import { Schedule, Todo, TodoId, TodoRepository } from '../../domains'
import { DataSource } from 'apollo-datasource'

class TodoDataSource extends DataSource<unknown> implements TodoRepository {
  constructor(todoRepository: TodoRepository) {
    super()
    this.repo = todoRepository
  }

  create(title: string, schedule: Schedule): Promise<Todo> {
    return this.repo.create(title, schedule)
  }
  readAll(): Promise<Todo[]> {
    return this.repo.readAll()
  }
  add(todo: Todo): Promise<Todo> {
    return this.repo.add(todo)
  }
  update(todo: Todo): Promise<Todo> {
    return this.repo.update(todo)
  }
  remove(todoId: TodoId): Promise<boolean> {
    return this.repo.remove(todoId)
  }
  private repo
}

export function toDataSource(todoRepository: TodoRepository): TodoDataSource {
  return new TodoDataSource(todoRepository)
}
