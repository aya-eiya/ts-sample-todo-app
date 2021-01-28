
import { GqlTodoRepository } from '#/infra/gql/todo/gqlTodoRepository';
import { TodoRepository } from '#/domain/repositories/todoRepository';

test('initialize', () => {
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  expect(repo !== null).toBeTruthy();
});