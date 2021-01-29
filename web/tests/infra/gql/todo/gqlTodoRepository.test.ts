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

test('create() gets new item with initialized id', async () => {
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  const title = 'my todo';
  const schedule = new Date();
  const todo = await repo.create(Todo.newItem({
    title,
    schedule
  }));
  if(todo) {
    expect(todo.id).toEqual('new');
    expect(todo.title).toEqual(title);
    expect(todo.schedule).toEqual(schedule);
  } else {
    fail('create todo failed');
  }
});