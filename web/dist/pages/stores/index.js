import { todoSlice } from './todoStore';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
export { todoRepoAdd, todoRepoReadAll, todoRepoRemove, todoRepoUpdate, todoRepoCreate, } from './todoStore';
var store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
    },
    middleware: function (getDefaultMiddleware) { return getDefaultMiddleware().concat(logger); },
});
export default store;
