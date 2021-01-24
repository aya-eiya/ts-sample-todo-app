import { Kind } from 'graphql'
import { arg, idArg, list, objectType, queryType, scalarType, stringArg } from 'nexus'
import { Schedule, Todo, TodoId } from '../../domains';
import { InMemoryTodoRepository } from '../../infra/InMemoryTodoRepository'

const repo = InMemoryTodoRepository.getInstance();

const date = scalarType({
  name: 'date',
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return value.getTime()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  },
})

export const TypeTodo = objectType({
  name: 'Todo',
  definition(t) {
    t.id('id')
    t.string('title')
    t.field('schedule', { type: date })
  }
})

const createArgs = {
  title: stringArg(),
  schedule: arg({
    type: date
  })
}
const updateArgs = {
  id: idArg(),
  title: stringArg(),
  schedule: arg({
    type: date
  })
}

class UpdateSchedule implements Schedule {
  constructor(_date: Date) {
    this.date = _date
  }
  date: Date
}

class UpdateTodo implements Todo {
  constructor(id: TodoId, title: string, scheduledDate: Date) {
    this._id = id;
    this.title = title;
    this.schedule = new UpdateSchedule(scheduledDate);
  }
  private _id: TodoId
  title: string
  schedule: Schedule
  id(): TodoId {
    return this._id
  }
}

export const Query = queryType({
  definition(t) {
    t.field('create', {
      type: TypeTodo,
      args: createArgs,
      async resolve (_,{title , schedule}){
        const todo = await repo.create(
          title || 'todo',
          schedule
        )
        return {
          id: todo.id().value,
          title: todo.title,
          schedule: todo.schedule.date
        }
      }
    })

    t.field('add', {
      type: TypeTodo,
      args: updateArgs,
      async resolve (_,{id, title, schedule}){
        const newTodo = new UpdateTodo(
          id ? new TodoId(id) : new TodoId('new'),
          title || 'todo',
          schedule
        );
        const todo = await repo.add(newTodo);
        return {
          id: todo.id().value,
          title: todo.title,
          schedule: todo.schedule.date
        }
      }
    })

    t.field('readAll', {
      type: list(TypeTodo),
      async resolve (_, _args) {
        return (await repo.readAll()).map(
          (todo) => ({
            id: todo.id().value,
            title: todo.title,
            schedule: todo.schedule.date
          })
        )
      }
    })

    t.field('update', {
      type: TypeTodo,
      args: updateArgs,
      async resolve (_,{id, title , schedule}) {
        const todo = await repo.update(new UpdateTodo(
          new TodoId(id || 'new'),
          title || 'todo',
          schedule
        ))
        return {
          id: todo.id().value,
          title: todo.title,
          schedule: todo.schedule.date
        }
      }
    })
  }
})