import { Todo, TodoId } from '../models/todo'
import { Schedule } from '../models/schedule'

export interface TodoRepository {
  create(title: string, schedule: Schedule): Promise<Todo>
  readAll(): Promise<Todo[]>
  add(todo: Todo): Promise<Todo>
  update(todo: Todo): Promise<Todo>
  remove(todoId: TodoId): Promise<boolean>
}
