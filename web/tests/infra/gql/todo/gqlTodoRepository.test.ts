import { GqlTodoRepository } from '#/infra/gql/todo/gqlTodoRepository';
import { TodoRepository } from '#/domain/repositories/todoRepository';
import { Todo } from '#/domain/models/todo';

test('initialized instance is not null or undefined', () => {
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  expect(repo).toBeTruthy();
});

test('readAll() gets empty array', async () => {
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  const todos: Todo[] = await repo.readAll();
  expect(todos).toEqual([]);
});

test('readAll() gets empty array', async () => {
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  repo.create();
  const todos: Todo[] = await repo.readAll();
  expect(todos).toEqual([]);
});