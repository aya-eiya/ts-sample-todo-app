import Head from 'next/head';
import React, { useState } from 'react';
import { createContainer } from 'unstated-next';
import { render } from 'react-dom';
import { Todo } from '#/domain/models/todo';
import { GqlTodoRepository } from '#/infra/gql';

const repo = GqlTodoRepository.getInstance();
function useCounter(initialState: Todo[] = []) {
  const [todos, setState] = useState(initialState);
  const readAll = async () => setState(await repo.readAll());
  const addTodo = async (todo: Todo) => {
    const newTodo = await repo.add(todo);
    if(newTodo) {
      readAll();
    }
  };
  const removeTodo = async (todo: Todo) => {
    const removed = await repo.remove(todo.id);
    if(removed) {
      readAll();
    }
  };
  return { todos, readAll, addTodo, removeTodo };
}
const Todos = createContainer(useCounter);
interface TodoInputProp {
  onSubmit: (todo: Todo) => void;
}
interface TodoInputState {
  todo: Todo,
  editTodo: {
    title: string,
    schedule: string
  }
}

class TodoInput extends React.Component<TodoInputProp,TodoInputState> {
  constructor(props: TodoInputProp) {
    super(props);
    this.state = {
      todo:Todo.newItem({title:'',schedule:new Date()}),
      editTodo: {
        title: '',
        schedule: ''
      }
    };
    this.onSubmit = props.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onScheduleChange = this.onScheduleChange.bind(this);
    repo.create(Todo.newItem({
      title:'new item',
      schedule: new Date()
    })).then((todo) => {
        if(todo) {
          this.setState({
            todo,
            editTodo: {
              title: todo.title,
              schedule: todo.schedule.toUTCString()
            }
         });
        }
      }
    );
  }

  onSubmit: (todo: Todo) => void;

  onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const title = event.target.value;
    this.setState({
      editTodo: {
        title,
        schedule: this.state.editTodo.schedule,
      },
      todo: Todo.newItem({ title , schedule:this.state.todo.schedule}),
    });
  }

  onScheduleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    this.setState({
      editTodo: {
        title: this.state.editTodo.title,
        schedule: value
      }
    });
    try {
      const schedule = new Date(value);
      this.setState({
        todo: Todo.newItem({title: this.state.editTodo.title, schedule }),
      });
    }
    catch(e) {
      console.log(e);
    }
  }

  render(): React.ReactNode {
    return <form className="grid grid-cols-4">
      <div className="m-1 h-8 p-1 content-center">
        <label htmlFor="title">Title</label>
      </div>
      <div className="col-span-3">
        <input type="text" name="title"
          className=" bg-gray-200 w-full rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2"
          value={this.state.editTodo.title}
          onChange={this.onTitleChange}
        />
      </div>
      <div className="m-1 h-8 p-1 content-center">
        <label htmlFor="schedule">Schedule</label>
      </div>
      <div className="col-span-3">
        <input type="text" name="schedule"
          className=" bg-gray-200 w-full rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2"
          value={this.state.editTodo.schedule}
          onChange={this.onScheduleChange}
        />
      </div>
      <p className="col-span-4 flex justify-end">
        <div>
          <button
            className="rounded p-1 w-20 bg-blue-200"
            type="button"
            onClick={() => this.onSubmit(this.state.todo)}>add</button>
        </div>
      </p>
    </form>;
  }
}


function TodoList(): JSX.Element {
  const todos = Todos.useContainer();
  todos.readAll();
  const todoList = todos.todos.map(t=>
    <li className="flex flex-row m-1 items-center" id={`todoItem_${t.id}`}>
      <div className="p-1">{t.title}</div>
      <div className="p-1">{t.schedule.toUTCString()}</div>
      <div className="p-1">
        <button
         className="rounded p-1 w-16 bg-gray-400"
         type="button"
         onClick={()=>todos.removeTodo(t)}>remove</button>
      </div>
    </li>
  );
  return <div className="flex flex-col h-screen">
    <div className="flex-2">
      <TodoInput onSubmit={(todo)=>{todos.addTodo(todo);}} />
    </div>
    <div className="flex-8">
      <ul className="">
        { todoList }
      </ul>
    </div>
  </div>;
}


export default function Home(): JSX.Element {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto w-9/12">
      <Head>
        <title>Simple Todo App</title>
        <link rel="icon" href="/favicon.ico" />
        <style>@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);</style>
      </Head>

      <main className="flex-1 flex flex-col justify-center items-center py-2 w-full">
        <h1 className="text-xl">
          TypeScript Next app example
        </h1>
        <Todos.Provider>
          <TodoList />
        </Todos.Provider>
      </main>

    </div>
  );
}
