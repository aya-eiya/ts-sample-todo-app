import Head from 'next/head';
import React from 'react';
import { Todo } from '#/domain/models/todo';
import { useSelector } from 'react-redux';
import { todoRepoAdd, todoRepoCreate, todoRepoReadAll, todoRepoRemove, todoRepoUpdate, } from './stores';
import TodoListItem from '#/view/components/todoListItem';
import TodoInput from '#/view/components/todoInput';
import { useDispatch } from 'react-redux';
function TodoList() {
    var todo = useSelector(function (state) { return state; }).todo;
    var todos = todo.todos, newItem = todo.newItem;
    var defaultNewItem = Todo.newItem({
        title: 'new item',
        schedule: new Date(),
    });
    var dispatch = useDispatch();
    dispatch(todoRepoReadAll());
    dispatch(todoRepoCreate(defaultNewItem));
    var todoList = todos.map(function (item) { return (<TodoListItem item={item} onSubmit={function (i) { return dispatch(todoRepoUpdate(i)); }} onRemove={function (i) { return dispatch(todoRepoRemove(i)); }}/>); });
    return (<div className="flex flex-col h-screen">
      <div className="flex-2 w-auto">
        <TodoInput onSubmit={function (i) { return dispatch(todoRepoAdd(i)); }} newItem={newItem}/>
      </div>
      <div className="flex-8 h-96 w-auto overflow-y-scroll">
        <ul className="fex">{todoList}</ul>
      </div>
    </div>);
}
export default function Home() {
    return (<div className="container flex flex-col items-center justify-center mx-auto w-9/12">
      <Head>
        <title>Simple Todo App</title>
        <link rel="icon" href="/favicon.ico"/>
        <style>
          @import
          url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
        </style>
      </Head>

      <main className="flex-1 flex flex-col justify-center items-center py-2 w-full">
        <h1 className="text-xl">TypeScript Next app example</h1>
        <TodoList />
      </main>
    </div>);
}
