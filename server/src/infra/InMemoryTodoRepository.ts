import { TodoRepository, Todo, Schedule, TodoId } from '../domains'
import log from '../app/log'

class InMemoryTodo implements Todo {
  constructor(id: TodoId, title: string, schedule: Schedule) {
    this._id = id
    this.title = title
    this.schedule = schedule
  }
  id(): TodoId {
    return this._id
  }
  private _id: TodoId
  title: string
  schedule: Schedule
}

export class InMemoryTodoRepository implements TodoRepository {
  private constructor() {
    this._store = []
    this._seq = 0
  }
  private static _repo: TodoRepository
  private _store: InMemoryTodo[]
  private _seq: number
  static getInstance(): TodoRepository {
    if (!InMemoryTodoRepository._repo) {
      InMemoryTodoRepository._repo = new InMemoryTodoRepository()
    }
    return InMemoryTodoRepository._repo
  }
  async create(title: string, schedule: Schedule): Promise<Todo> {
    log.debug(`create api called ${JSON.stringify({ title, schedule })}`)
    return new InMemoryTodo(new TodoId('new'), title, schedule)
  }

  async readAll(): Promise<Todo[]> {
    log.debug(`read all api called`)
    return [...this._store]
  }

  async add(todo: Todo): Promise<Todo> {
    log.debug(`add api called ${JSON.stringify(todo)}`)
    if (todo.id().value === 'new') {
      this._seq++
      const t = new InMemoryTodo(
        new TodoId(`${this._seq}`),
        todo.title,
        todo.schedule
      )
      this._store.push(t)
      return t
    }
    return todo
  }

  async update(todo: Todo): Promise<Todo> {
    log.debug(`update api called ${JSON.stringify(todo)}`)
    if (todo.id().value !== 'new' && (await this.remove(todo.id()))) {
      const t = new InMemoryTodo(todo.id(), todo.title, todo.schedule)
      this._store.push(t)
      return t
    }
    return todo
  }

  async remove(todoId: TodoId): Promise<boolean> {
    log.debug(`remove api called ${JSON.stringify({ todoId })}`)
    const i = this._store.findIndex((t) => t.id().value === todoId.value)
    if (i > -1) {
      this._store = this._store.filter((t) => t.id().value !== todoId.value)
      return true
    }
    return false
  }
}
