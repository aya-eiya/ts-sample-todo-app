import { GqlTodoRepository } from '#/infra/gql/todo/gqlTodoRepository';
import { Todo } from '#/domain/models/todo';
// GraphQL Server との E2E テストです
// テスト間には依存性があり、失敗時に失敗したテストケースだけを
// 再実行できるることを保証しません
async function until(f) {
    const timeout = 5000;
    let timeoutId;
    return new Promise((res, rej) => {
        setTimeout(() => {
            rej('timeout');
            clearTimeout(timeoutId);
        }, timeout);
        const g = () => {
            if (f()) {
                res();
            }
            else {
                timeoutId = setTimeout(g, 300);
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
    update: false,
    remove: false,
};
const dateOf = {
    '2021-01-01T04:48:10+0900': new Date(1609444090000),
    '2021-04-01T01:55:10+0900': new Date(1617209710000),
    '2021-12-01T08:46:19+0900': new Date(1638315979000),
};
beforeAll(async (done) => {
    const repo = GqlTodoRepository.getInstance();
    await Promise.all((await repo.readAll()).map((t) => repo.remove(t.id)));
    testScenario.init = true;
    done();
});
test('initialized instance is not null or undefined', () => {
    const repo = GqlTodoRepository.getInstance();
    expect(repo).toBeTruthy();
});
test('readAll() gets empty array', async () => {
    const repo = GqlTodoRepository.getInstance();
    const todos = await repo.readAll();
    expect(todos).toEqual([]);
    testScenario.readAll = true;
});
test('create() gets new item with initialized id', async () => {
    const repo = GqlTodoRepository.getInstance();
    const title = 'my todo';
    const schedule = dateOf['2021-01-01T04:48:10+0900'];
    const todo = await repo.create(Todo.newItem({
        title,
        schedule
    }));
    if (todo) {
        expect(todo.id).toEqual('new');
        expect(todo.title).toEqual(title);
        expect(todo.schedule).toEqual(schedule);
    }
    else {
        fail('create todo failed');
    }
    testScenario.create = true;
});
test('add() gets added item with new id', async () => {
    await until(() => testScenario.create);
    const repo = GqlTodoRepository.getInstance();
    const title = 'my todo';
    const schedule = dateOf['2021-04-01T01:55:10+0900'];
    const todo = await repo.create(Todo.newItem({
        title,
        schedule
    }));
    if (todo) {
        const added = await repo.add(todo);
        if (added) {
            expect(added.id).not.toEqual('new');
            expect(added.title).toEqual(title);
            expect(added.schedule).toEqual(schedule);
        }
        else {
            fail('add todo failed');
        }
    }
    else {
        fail('create todo failed');
    }
    testScenario.add = true;
});
test('readAll() after add() once gets added item', async () => {
    await until(() => testScenario.add);
    const repo = GqlTodoRepository.getInstance();
    const todos = await repo.readAll();
    expect(todos).toHaveLength(1);
    const title = 'my todo';
    const schedule = dateOf['2021-04-01T01:55:10+0900'];
    const todo = todos[0];
    expect(todo.title).toEqual(title);
    expect(todo.schedule).toEqual(schedule);
    testScenario.readAllAfterAdd = true;
});
test('update() the added item', async () => {
    await until(() => testScenario.add);
    const repo = GqlTodoRepository.getInstance();
    const todos = await repo.readAll();
    const title = 'updated';
    const schedule = dateOf['2021-12-01T08:46:19+0900'];
    const todo = todos[0];
    const updateTodo = todo.copyWith({ title, schedule });
    const updatedTodo = await repo.update(updateTodo);
    if (updatedTodo) {
        expect(updatedTodo.id).toEqual(updateTodo.id);
        expect(updatedTodo.title).toEqual(updateTodo.title);
        expect(updatedTodo.schedule).toEqual(updateTodo.schedule);
    }
    testScenario.update = true;
});
test('remove() first id gets true', async () => {
    await until(() => testScenario.update);
    const repo = GqlTodoRepository.getInstance();
    const todos = await repo.readAll();
    const todo = todos[0];
    const res = await repo.remove(todo.id);
    expect(res).toBe(true);
    testScenario.remove = true;
});
//# sourceMappingURL=gqlTodoRepository.test.js.map