import Head from 'next/head';
import React, { useEffect } from 'react';
import { Todo } from '#/domain/models/todo';
import { useSelector, ReactReduxContext } from 'react-redux';
import { createDispatch, RootState, todoRepoAdd, todoRepoCreate, todoRepoReadAll, todoRepoRemove, todoRepoUpdate  } from './stores';

import TodoListItem from '#/view/components/todoListItem';
import TodoInput from '#/view/components/todoInput';


function TodoList(): JSX.Element {
  const { todo } = useSelector((state: RootState) => state);
  const { todos, newItem } = todo;
  const dispatch = createDispatch();
  const defaultNewItem = Todo.newItem({
    title: 'new item',
    schedule: new Date()
  });
  dispatch(todoRepoReadAll());
  dispatch(todoRepoCreate(defaultNewItem));

  const todoList = todos.map((item: Todo) =>
    <TodoListItem
      item={item}
      onSubmit={(todo) => dispatch(todoRepoUpdate(todo))}
      onRemove={(todo) => dispatch(todoRepoRemove(todo))}
    />
  );
  return <div className="flex flex-col h-screen">
    <div className="flex-2 w-auto">
      <TodoInput onSubmit={(todo)=>dispatch(todoRepoAdd(todo))} newItem={newItem} />
    </div>
    <div className="flex-8 h-96 w-auto overflow-y-scroll">
      <ul className="fex">
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
          <TodoList />
      </main>
    </div>
  );
}
