import { Todo } from '#/domain/models/todo';
export declare const todoRepoCreate: import("@reduxjs/toolkit").AsyncThunk<Todo, Todo, {}>;
export declare const todoRepoReadAll: import("@reduxjs/toolkit").AsyncThunk<Todo[], void, {}>;
export declare const todoRepoAdd: import("@reduxjs/toolkit").AsyncThunk<Todo[], Todo, {}>;
export declare const todoRepoRemove: import("@reduxjs/toolkit").AsyncThunk<Todo[], Todo, {}>;
export declare const todoRepoUpdate: import("@reduxjs/toolkit").AsyncThunk<Todo[], Todo, {}>;
export interface TodoStoreState {
    newItem: Todo | undefined;
    todos: Todo[];
}
export declare const todoSlice: import("@reduxjs/toolkit").Slice<TodoStoreState, {}, "todos">;
