import { Todo } from '../../../domain/models/todo';
import { TodoRepository } from '../../../domain/repositories/todoRepository';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './requests';
import { env as appEnv } from '../../../app/env';

export class GqlTodoRepository implements TodoRepository {
  private constructor(env: {
    endpoint: string | URL
  }){
    if(env.endpoint instanceof URL) {
      this.client = new GraphQLClient(env.endpoint.toString());
    }
else {
      this.client = new GraphQLClient(env.endpoint);
    }
  }

  private client: GraphQLClient;

  private static instance: TodoRepository;
  static getInstance(): TodoRepository {
    if(!this.instance) {
      this.instance = new GqlTodoRepository(appEnv);
    }
    return this.instance;
  }

  async readAll(): Promise<Todo[]> {
    return (await getSdk(this.client).readAll()).readAll.filter(t=>t !== undefined).map(t=>
      Todo.of({...t})
    );
  }

  async create(todo: Todo): Promise<Todo| undefined> {
    const t = (await getSdk(this.client).create({...todo})).create;
    if(t) {
      return Todo.of({...t});
    }
    return undefined;
  }
  async add(todo: Todo): Promise<Todo| undefined> {
    const t = (await getSdk(this.client).add({...todo})).add;
    if(t) {
      return Todo.of({...t});
    }
    return undefined;
  }
  update(todo: Todo): Promise<Todo| undefined> {
    throw new Error('Method not implemented.');
  }
  delete(todo: Todo): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}