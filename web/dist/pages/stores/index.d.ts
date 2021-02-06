export { todoRepoAdd, todoRepoReadAll, todoRepoRemove, todoRepoUpdate, todoRepoCreate, } from './todoStore';
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    todo: import("./todoStore").TodoStoreState;
}, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<import("redux-thunk").ThunkMiddleware<{
    todo: import("./todoStore").TodoStoreState;
}, import("redux").AnyAction, null> | import("redux-thunk").ThunkMiddleware<{
    todo: import("./todoStore").TodoStoreState;
}, import("redux").AnyAction, undefined> | import("redux").Middleware<{}, {
    todo: import("./todoStore").TodoStoreState;
}, import("redux").Dispatch<import("redux").AnyAction>> | import("redux").Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>>>>;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppDispatch = typeof store.dispatch;
export default store;
