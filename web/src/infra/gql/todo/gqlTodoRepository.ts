import { env as appEnv } from '#/app/env'
import { Todo } from '#/domain/models/todo'
import { TodoRepository } from '#/domain/repositories/todoRepository'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './requests'

export class GqlTodoRepository implements TodoRepository {
  private constructor(env: { endpoint: string | URL }) {
    if (env.endpoint instanceof URL) {
      this.client = new GraphQLClient(env.endpoint.toString())
    } else {
      this.client = new GraphQLClient(env.endpoint)
    }
  }

  private client: GraphQLClient

  private static instance: TodoRepository
  static getInstance(): TodoRepository {
    if (!this.instance) {
      this.instance = new GqlTodoRepository(appEnv)
    }
    return this.instance
  }

  async readAll(): Promise<Todo[]> {
    return (await getSdk(this.client).readAll()).readAll
      .filter((t) => t !== undefined)
      .map((t) => Todo.of({ ...t }))
  }

  async create(todo: Todo): Promise<Todo | undefined> {
    const t = (await getSdk(this.client).create({ ...todo })).create
    if (t) {
      return Todo.of({ ...t })
    }
    return undefined
  }
  async add(todo: Todo): Promise<Todo | undefined> {
    const t = (await getSdk(this.client).add({ ...todo })).add
    if (t) {
      return Todo.of({ ...t })
    }
    return undefined
  }
  async update(todo: Todo): Promise<Todo | undefined> {
    const t = (await getSdk(this.client).update({ ...todo })).update
    if (t) {
      return Todo.of({ ...t })
    }
    return undefined
  }
  async remove(todoId: string): Promise<boolean> {
    const t = (await getSdk(this.client).remove({ id: todoId })).remove
    if (t) {
      return t
    }
    return false
  }
}
