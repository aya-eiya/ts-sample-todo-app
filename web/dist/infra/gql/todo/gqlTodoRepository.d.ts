import { Todo } from '#/domain/models/todo';
import { TodoRepository } from '#/domain/repositories/todoRepository';
export declare class GqlTodoRepository implements TodoRepository {
    private constructor();
    private client;
    private static instance;
    static getInstance(): TodoRepository;
    readAll(): Promise<Todo[]>;
    create(todo: Todo): Promise<Todo | undefined>;
    add(todo: Todo): Promise<Todo | undefined>;
    update(todo: Todo): Promise<Todo | undefined>;
    remove(todoId: string): Promise<boolean>;
}
