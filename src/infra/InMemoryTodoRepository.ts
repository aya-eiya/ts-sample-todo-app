import { TodoRepository, Todo, Schedule, TodoId } from '../domains'

class InMemoryTodo implements Todo {
  constructor(id: TodoId, title: string, schedule: Schedule ) {
    this._id = id
    this.title = title
    this.schedule = schedule
  }
  id(): TodoId {
    return this._id;
  }
  private _id: TodoId
  title: string
  schedule: Schedule
}

export class InMemoryTodoRepository implements TodoRepository {
  private constructor() {
    this._store = [];
    this._seq = 0;
  }
  private static _repo: TodoRepository
  private _store: InMemoryTodo[]
  private _seq: number
  static getInstance(): TodoRepository {
    if (! InMemoryTodoRepository._repo) {
      InMemoryTodoRepository._repo = new InMemoryTodoRepository();
    }
    return InMemoryTodoRepository._repo;
  }
  async create(title: string, schedule: Schedule): Promise<Todo> {
    return new InMemoryTodo(
      new TodoId('new'),
      title,
      schedule
    )
  }

  async readAll(): Promise<Todo[]> {
    return [...this._store]
  }

  async add(todo: Todo): Promise<Todo> {
    console.log(todo.id().value);
    if(todo.id().value !== 'new') {
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
    if(todo.id().value !== 'new' && this.delete(todo)) {
      const t = new InMemoryTodo(
        todo.id(),
        todo.title,
        todo.schedule
      )
      this._store.push(t)
      return t
    } 
    return todo
  }

  async delete(todo: Todo): Promise<boolean> {
    const i = this._store.findIndex(t=>t.id() === todo.id())
    if(i >-1) {
      this._store.splice(i, 1);
      return true
    }
    return false
  }
  
}