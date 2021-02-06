import Head from 'next/head'
import React, { useCallback } from 'react'
import { Todo, DomainTodo } from '#/domain/models/todo'
import { useSelector } from 'react-redux'
import {
  AppDispatch,
  RootState,
  todoRepoAdd,
  todoRepoCreate,
  todoRepoRemove,
  todoRepoUpdate,
  todoRepoReadAll,
} from './store'

import TodoListItem from '#/view/components/todoListItem'
import TodoInput from '#/view/components/todoInput'

import { useDispatch } from 'react-redux'

const defaultNewItem = DomainTodo.newItem({
  title: 'new item',
  schedule: new Date(),
})

function TodoList(): JSX.Element {
  const { newItem, todos } = useSelector((state: RootState) => state.todo)
  const dispatch: AppDispatch = useDispatch()

  if (!newItem || newItem.toJSON() !== defaultNewItem.toJSON())
    dispatch(todoRepoCreate(defaultNewItem))

  if (todos === undefined) dispatch(todoRepoReadAll())

  const itemUpdate = useCallback(
    (update: Todo) => {
      dispatch(todoRepoUpdate(update))
    },
    [dispatch]
  )

  const itemRemove = useCallback(
    (remove: Todo) => {
      dispatch(todoRepoRemove(remove))
    },
    [dispatch]
  )

  const itemAdd = useCallback(
    (add: Todo) => {
      dispatch(todoRepoAdd(add))
    },
    [dispatch]
  )

  const todoList = (todos || []).map((todo: Todo) => (
    <TodoListItem item={todo} onSubmit={itemUpdate} onRemove={itemRemove} />
  ))
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-2 w-auto">
        <TodoInput onSubmit={itemAdd} newItem={newItem} />
      </div>
      <div className="flex-8 h-96 w-auto overflow-y-scroll">
        <ul className="fex">{todoList}</ul>
      </div>
    </div>
  )
}

export default function Home(): JSX.Element {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto w-9/12">
      <Head>
        <title>Simple Todo App</title>
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
        </style>
      </Head>

      <main className="flex-1 flex flex-col justify-center items-center py-2 w-full">
        <h1 className="text-xl">TypeScript Next app example</h1>
        <TodoList />
      </main>
    </div>
  )
}
