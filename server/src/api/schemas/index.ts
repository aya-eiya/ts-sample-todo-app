import { Kind } from "graphql";
import { arg, idArg, list, objectType, queryType, scalarType, stringArg } from "nexus";
import { Schedule, Todo as DomainTodo, TodoId } from "../../domains";
import { InMemoryTodoRepository } from "../../infra/InMemoryTodoRepository";
import { Todo as ApiTodo } from "../models";

// TODO: use DI
const repo = InMemoryTodoRepository.getInstance();

const date = scalarType({
  name: "date",
  asNexusMethod: "date",
  description: "Date custom scalar type",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return undefined;
  },
});

export const TypeTodo = objectType({
  name: "Todo",
  definition(t) {
    t.id("id");
    t.string("title");
    t.field("schedule", { type: date });
  }
});

const createArgs = {
  title: stringArg(),
  schedule: arg({
    type: date
  })
};
const updateArgs = {
  id: idArg(),
  title: stringArg(),
  schedule: arg({
    type: date
  })
};

class UpdateSchedule implements Schedule {
  constructor(_date: Date) {
    this.date = _date;
  }
  date: Date;
}

class UpdateTodo implements DomainTodo {
  constructor(id: TodoId, title: string, scheduledDate: Date) {
    this._id = id;
    this.title = title;
    this.schedule = new UpdateSchedule(scheduledDate);
  }
  private _id: TodoId;
  title: string;
  schedule: Schedule;
  id(): TodoId {
    return this._id;
  }
}

class OutputTodo implements ApiTodo {
  private constructor(todo: DomainTodo) {
    this.id = todo.id().value;
    this.title = todo.title;
    this.schedule = todo.schedule.date;
  }
  static of(todo: DomainTodo): ApiTodo {
    return new OutputTodo(todo);
  }
  id: string;
  title: string;
  schedule: Date;

}

export const Query = queryType({
  definition(t) {
    t.field("create", {
      type: TypeTodo,
      args: createArgs,
      async resolve(_,{title , schedule}){
        const todo = await repo.create(
          title || "todo",
          schedule
        );
        return OutputTodo.of(todo);
      }
    });

    t.field("add", {
      type: TypeTodo,
      args: updateArgs,
      async resolve(_,{id, title, schedule}){
        const newTodo = new UpdateTodo(
          id ? new TodoId(id) : new TodoId("new"),
          title || "todo",
          schedule
        );
        const todo = await repo.add(newTodo);
        return OutputTodo.of(todo);
      }
    });

    t.field("readAll", {
      type: list(TypeTodo),
      async resolve(_, _args) {
        return (await repo.readAll()).map(OutputTodo.of);
      }
    });

    t.field("update", {
      type: TypeTodo,
      args: updateArgs,
      async resolve(_,{id, title , schedule}) {
        const todo = await repo.update(new UpdateTodo(
          new TodoId(id || "new"),
          title || "todo",
          schedule
        ));
        return OutputTodo.of(todo);
      }
    });
  }
});