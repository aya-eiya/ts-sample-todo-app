import { todoSlice } from './todoStore';
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

export { todoRepoAdd, todoRepoReadAll, todoRepoRemove, todoRepoUpdate, todoRepoCreate } from './todoStore';


const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const createDispatch = () => useDispatch<AppDispatch>();

export default store;