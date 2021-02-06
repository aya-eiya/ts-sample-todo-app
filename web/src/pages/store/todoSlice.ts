import { Todo } from '#/domain/models/todo'
import { GqlTodoRepository } from '#/infra/gql'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import log from '#/app/log'

const repo = GqlTodoRepository.getInstance()

export const todoRepoCreate = createAsyncThunk<Todo, Todo>(
  'todo/create',
  async (todo: Todo, _thunkAPI): Promise<Todo> => {
    log.debug(`call todo api create(todo: ${todo})`)
    return repo.create(todo).then((t) => t || todo)
  }
)

export const todoRepoReadAll = createAsyncThunk<Todo[]>(
  'todo/readAll',
  async (_thunkAPI): Promise<Todo[]> => {
    log.debug(`call todo api readAll()`)
    return repo.readAll()
  }
)

export const todoRepoAdd = createAsyncThunk<Todo[], Todo>(
  'todo/add',
  async (todo: Todo, _thunkAPI): Promise<Todo[]> => {
    log.debug(`call todo api add(todo: ${todo})`)
    await repo.add(todo)
    return repo.readAll()
  }
)

export const todoRepoRemove = createAsyncThunk<Todo[], Todo>(
  'todo/remove',
  async (todo: Todo, _thunkAPI): Promise<Todo[]> => {
    log.debug(`call todo api remove(todo: ${todo})`)
    await repo.remove(todo.id)
    return repo.readAll()
  }
)

export const todoRepoUpdate = createAsyncThunk<Todo[], Todo>(
  'todo/update',
  async (todo: Todo, _thunkAPI): Promise<Todo[]> => {
    log.debug(`call todo api update(todo: ${todo})`)
    await repo.update(todo)
    return repo.readAll()
  }
)

export interface TodoStoreState {
  newItem: Todo | undefined
  todos: Todo[] | undefined
}

const initialState: TodoStoreState = {
  newItem: undefined,
  todos: undefined,
}

export const todoSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create
      .addCase(todoRepoCreate.pending, (_state, _action) => {
        log.debug('create pending')
      })
      .addCase(todoRepoCreate.fulfilled, (state, action) => {
        state.newItem = action.payload
      })
      .addCase(todoRepoCreate.rejected, (_state, _action) => {
        log.warn('create rejected')
      })
      // readAll
      .addCase(todoRepoReadAll.pending, (_state, _action) => {
        log.debug('readAll pending')
      })
      .addCase(todoRepoReadAll.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(todoRepoReadAll.rejected, (_state, _action) => {
        log.warn('readAll rejected')
      })
      // add
      .addCase(todoRepoAdd.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      // remove
      .addCase(todoRepoRemove.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      // update
      .addCase(todoRepoUpdate.fulfilled, (state, action) => {
        state.todos = action.payload
      })
  },
})
