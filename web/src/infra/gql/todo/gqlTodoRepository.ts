import { env as appEnv } from '#/app/env'
import log from '#/app/log'
import { Todo, DomainTodo } from '#/domain/models/todo'
import { TodoRepository } from '#/domain/repositories/todoRepository'
import { GraphQLClient } from 'graphql-request'
import { getSdk, Sdk } from './requests'

export class GqlTodoRepository implements TodoRepository {
  private constructor(env: { endpoint: string | URL }) {
    if (env.endpoint instanceof URL) {
      const client = new GraphQLClient(env.endpoint.toString())
      this.sdk = getSdk(client)
    } else {
      const client = new GraphQLClient(env.endpoint)
      this.sdk = getSdk(client)
    }
  }

  private sdk: Sdk

  private static instance: TodoRepository
  static getInstance(): TodoRepository {
    if (!this.instance) {
      this.instance = new GqlTodoRepository(appEnv)
    }
    return this.instance
  }

  async readAll(): Promise<Todo[]> {
    log.debug('repository call readAll')
    return (await this.sdk.readAll()).readAll
      .filter((i) => i)
      .map((i) =>
        DomainTodo.of({
          id: i.id,
          title: i.title,
          schedule: new Date(i.schedule as number),
        })
      )
  }

  async create(todo: Todo): Promise<Todo | undefined> {
    log.debug('repository call create')
    const t = (await this.sdk.create({ ...todo })).create
    if (t) {
      return DomainTodo.of({ ...t })
    }
    return undefined
  }

  async add(todo: Todo): Promise<Todo | undefined> {
    const t = (await this.sdk.add({ ...todo })).add
    if (t) {
      return DomainTodo.of({ ...t })
    }
    return undefined
  }

  async update(todo: Todo): Promise<Todo | undefined> {
    const t = (await this.sdk.update({ ...todo })).update
    if (t) {
      return DomainTodo.of({ ...t })
    }
    return undefined
  }

  async remove(todoId: string): Promise<boolean> {
    const t = (await this.sdk.remove({ id: todoId })).remove
    if (t) {
      return t
    }
    return false
  }
}
