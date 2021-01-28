import { Todo } from '../../../domain/models/todo';
import { TodoRepository } from '../../../domain/repositories/todoRepository';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../types';

// TODO to build-time option
const endpoint = 'http://localhost:4000/graphql';


export class GqlTodoRepository implements TodoRepository {
  private constructor(){
    this.client = new GraphQLClient(endpoint);
  }

  private client: GraphQLClient;

  private static instance: TodoRepository;
  static getInstance(): TodoRepository {
    if(!this.instance) {
      this.instance = new GqlTodoRepository();
    }
    return this.instance;
  }

  async readAll(): Promise<Todo[]> {
    const qry = await getSdk(this.client).readAll();
    const res = qry.readAll.map(t=>
      new Todo(t.id, t.title, t.schedule)
    );
    return res;
  }
  async create(): Promise<Todo> {
    throw new Error('Method not implemented.');
  }
  add(todo: Todo): Promise<Todo> {
    throw new Error('Method not implemented.');
  }
  update(todo: Todo): Promise<Todo> {
    throw new Error('Method not implemented.');
  }
  delete(todo: Todo): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}