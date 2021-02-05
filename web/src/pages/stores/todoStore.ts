import { Todo } from '#/domain/models/todo'
import { GqlTodoRepository } from '#/infra/gql'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const repo = GqlTodoRepository.getInstance()

export const todoRepoCreate = createAsyncThunk<Todo, Todo>(
  'todo/create',
  async (todo: Todo, _thunkAPI): Promise<Todo> =>
    repo.create(todo).then((t) => t || todo)
)

export const todoRepoReadAll = createAsyncThunk<Todo[]>(
  'todo/readAll',
  async (_thunkAPI): Promise<Todo[]> => repo.readAll()
)

export const todoRepoAdd = createAsyncThunk<Todo[], Todo>(
  'todo/add',
  async (todo: Todo, _thunkAPI): Promise<Todo[]> => {
    await repo.add(todo)
    return repo.readAll()
  }
)

export const todoRepoRemove = createAsyncThunk<Todo[], Todo>(
  'todo/remove',
  async (todo: Todo, _thunkAPI): Promise<Todo[]> => {
    await repo.remove(todo.id)
    return repo.readAll()
  }
)

export const todoRepoUpdate = createAsyncThunk<Todo[], Todo>(
  'todo/update',
  async (todo: Todo, _thunkAPI): Promise<Todo[]> => {
    await repo.update(todo)
    return repo.readAll()
  }
)

export interface TodoStoreState {
  newItem: Todo | undefined
  todos: Todo[]
}

const initialState: TodoStoreState = {
  newItem: undefined,
  todos: [],
}

export const todoSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todoRepoCreate.fulfilled, (state, action) => {
        state.newItem = action.payload
      })
      .addCase(todoRepoReadAll.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(todoRepoAdd.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(todoRepoRemove.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(todoRepoUpdate.fulfilled, (state, action) => {
        state.todos = action.payload
      })
  },
})
