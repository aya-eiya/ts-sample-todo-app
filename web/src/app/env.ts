import { defaults } from 'autoprefixer';

export const defaultEnv = {
  TODO_REPOSITORY: 'http://localhost:4000/graphql',
};

export const env = {
  endpoint: process.env.TODO_REPOSITORY || defaultEnv.TODO_REPOSITORY
};