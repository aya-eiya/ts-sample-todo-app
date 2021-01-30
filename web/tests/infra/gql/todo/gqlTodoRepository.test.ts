import { GqlTodoRepository } from '#/infra/gql/todo/gqlTodoRepository';
import { TodoRepository } from '#/domain/repositories/todoRepository';
import { Todo } from '#/domain/models/todo';

async function until(f:()=> boolean): Promise<void> {
  const timeout = 5000;
  let timeoutId: ReturnType<typeof setTimeout>;
  return new Promise((res,rej)=> {
    setTimeout(
      () => {
        rej('timeout');
        clearTimeout(timeoutId);
      }
      ,timeout);
    const g = () => {
      if(f()){
        res();
      }
      else {
        timeoutId = setTimeout(g,300);
      }
    };
    g();
  });
}

// 依存ありテストのためのフラグ管理
const testScenario = {
  init: false,
  readAll: false,
  create: false,
  add: false,
  readAllAfterAdd: false,
};

const dateOf = {
  '2021-01-01T04:48:10+0900': new Date(1609444090000),
  '2021-04-01T01:55:10+0900': new Date(1617209710000),
  '2021-12-01T08:46:19+0900': new Date(1638315979000),
}

test('initialized instance is not null or undefined', () => {
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  expect(repo).toBeTruthy();
  testScenario.init = true;
});

test('readAll() gets empty array', async () => {
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  const todos: Todo[] = await repo.readAll();
  expect(todos).toEqual([]);
  testScenario.readAll = true;
});

test('create() gets new item with initialized id', async () => {
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  const title = 'my todo';
  const schedule = dateOf['2021-01-01T04:48:10+0900'];
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
  testScenario.create = true;
});

test('add() gets added item with new id', async () => {
  await until(() => testScenario.create);
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  const title = 'my todo';
  const schedule = dateOf['2021-04-01T01:55:10+0900'];
  const todo = await repo.create(Todo.newItem({
    title,
    schedule
  }));
  if(todo) {
    const added = await repo.add(todo);
    if(added) {
      expect(added.id).toEqual('1');
      expect(added.title).toEqual(title);
      expect(added.schedule).toEqual(schedule);
    }else{
      fail('add todo failed');
    }
  } else {
    fail('create todo failed');
  }
  testScenario.add = true;
});

test('readAll() after add() ones gets added item', async () => {
  await until(() => testScenario.add);
  const repo: TodoRepository = GqlTodoRepository.getInstance();
  const todos: Todo[] = await repo.readAll();
  expect(todos).toHaveLength(1);
  const title = 'my todo';
  const schedule = dateOf['2021-04-01T01:55:10+0900'];
  const todo = todos[0];
  expect(todo.id).toEqual('1');
  expect(todo.title).toEqual(title);
  expect(todo.schedule).toEqual(schedule);
  testScenario.readAllAfterAdd = true;
});
