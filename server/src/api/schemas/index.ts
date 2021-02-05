import { Kind } from 'graphql'
import {
  arg,
  idArg,
  list,
  objectType,
  queryType,
  scalarType,
  stringArg,
  nonNull,
  mutationType,
} from 'nexus'
import { Schedule, Todo as DomainTodo, TodoId } from '../../domains'
import { Todo as ApiTodo } from '../models'

const date = scalarType({
  name: 'Date',
  asNexusMethod: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    if (value) {
      return new Date(value)
    }
    throw Error(`perseValue: ${value}`)
  },
  serialize(value) {
    if (value) {
      return value.getTime()
    }
    throw Error(`serialize: ${value}`)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value))
    }
    throw Error(`parseLiteral: ${ast}`)
  },
})

export const TypeTodo = objectType({
  name: 'Todo',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.field('schedule', { type: date })
  },
})

const createArgs = {
  title: nonNull(stringArg()),
  schedule: nonNull(
    arg({
      type: date,
    })
  ),
}
const updateArgs = {
  id: nonNull(idArg()),
  title: nonNull(stringArg()),
  schedule: nonNull(
    arg({
      type: date,
    })
  ),
}

class UpdateSchedule implements Schedule {
  constructor(_date: Date) {
    this.date = _date
  }
  date: Date
}
const removeArgs = {
  id: nonNull(idArg()),
}

class UpdateTodo implements DomainTodo {
  constructor(id: TodoId, title: string, scheduledDate: Date) {
    this._id = id
    this.title = title
    this.schedule = new UpdateSchedule(scheduledDate)
  }
  private _id: TodoId
  title: string
  schedule: Schedule
  id(): TodoId {
    return this._id
  }
}

class OutputTodo implements ApiTodo {
  private constructor(todo: DomainTodo) {
    this.id = todo.id().value
    this.title = todo.title
    this.schedule = todo.schedule.date
  }
  static of(todo: DomainTodo): ApiTodo {
    return new OutputTodo(todo)
  }
  id: string
  title: string
  schedule: Date
}

export const Query = queryType({
  definition(t) {
    t.field('create', {
      type: TypeTodo,
      args: createArgs,
      async resolve(_source, { title, schedule }, { dataSources }) {
        const repo = dataSources.todoRepository
        const todo = await repo.create(
          title || 'todo',
          new UpdateSchedule(schedule)
        )
        return OutputTodo.of(todo)
      },
    })

    t.field('readAll', {
      type: nonNull(list(nonNull(TypeTodo))),
      async resolve(_source, _args, { dataSources }) {
        const repo = dataSources.todoRepository
        return (await repo.readAll()).map(OutputTodo.of)
      },
    })
  },
})

export const Mutation = mutationType({
  definition(t) {
    t.field('add', {
      type: nonNull(TypeTodo),
      args: updateArgs,
      async resolve(_, { id, title, schedule }, { dataSources }) {
        const repo = dataSources.todoRepository
        const newTodo = new UpdateTodo(
          id ? new TodoId(id) : new TodoId('new'),
          title || 'todo',
          schedule
        )
        const todo = await repo.add(newTodo)
        return OutputTodo.of(todo)
      },
    })

    t.field('update', {
      type: nonNull(TypeTodo),
      args: updateArgs,
      async resolve(_, { id, title, schedule }, { dataSources }) {
        const repo = dataSources.todoRepository
        const todo = await repo.update(
          new UpdateTodo(new TodoId(id), title, schedule)
        )
        return OutputTodo.of(todo)
      },
    })

    t.field('remove', {
      type: 'Boolean',
      args: removeArgs,
      async resolve(_, { id }, { dataSources }) {
        const repo = dataSources.todoRepository
        return repo.remove(new TodoId(id))
      },
    })
  },
})
