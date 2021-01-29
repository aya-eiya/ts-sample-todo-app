export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  date: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  add: Todo;
  update: Todo;
};


export type MutationAddArgs = {
  id: Scalars['ID'];
  schedule: Scalars['date'];
  title: Scalars['String'];
};


export type MutationUpdateArgs = {
  id: Scalars['ID'];
  schedule: Scalars['date'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  create?: Maybe<Todo>;
  readAll: Array<Todo>;
};


export type QueryCreateArgs = {
  schedule: Scalars['date'];
  title: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  schedule: Scalars['date'];
  title: Scalars['String'];
};


export type ReadAllQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadAllQuery = (
  { __typename?: 'Query' }
  & { readAll: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'schedule'>
  )> }
);
