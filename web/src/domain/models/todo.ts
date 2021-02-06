export interface Todo {
  id: string
  title: string
  schedule: Date
  copyWith({
    title,
    schedule,
  }: {
    title?: string
    schedule?: Date | string
  }): Todo
  fromJSON(jsonString: string): Todo
  toJSON(): string
}

export class DomainTodo implements Todo {
  static newItem({
    title,
    schedule,
  }: {
    title: string
    schedule: Date | number
  }): Todo {
    return new DomainTodo('new', title, schedule)
  }
  static of({
    id,
    title,
    schedule,
  }: {
    id: string
    title: string
    schedule: Date
  }): Todo {
    return new DomainTodo(id, title, schedule)
  }
  constructor(id: string, title: string, schedule: Date | number) {
    this.id = id
    this.title = title
    if (schedule instanceof Date) {
      this.schedule = schedule
    } else {
      this.schedule = new Date(schedule)
    }
  }
  id: string
  title: string
  schedule: Date

  copyWith({
    title,
    schedule,
  }: {
    title: string | undefined
    schedule: Date | string | undefined
  }): Todo {
    if (schedule instanceof Date) {
      return new DomainTodo(this.id, title || this.title, schedule)
    } else if (schedule !== undefined) {
      try {
        const _schedule = new Date(schedule)
        return new DomainTodo(this.id, title || this.title, _schedule)
      } catch {
        return new DomainTodo(this.id, title || this.title, this.schedule)
      }
    } else {
      return new DomainTodo(this.id, title || this.title, this.schedule)
    }
  }
  toString(): string {
    return this.toJSON()
  }

  fromJSON(jsonString: string): DomainTodo {
    const todo: Todo = JSON.parse(jsonString)
    return new DomainTodo(todo.id, todo.title, todo.schedule)
  }

  toJSON(): string {
    const { id, title, schedule } = this
    return JSON.stringify({ id, title, schedule })
  }
}
