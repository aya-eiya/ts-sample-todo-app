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
  Date: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  add: Todo;
  remove?: Maybe<Scalars['Boolean']>;
  update: Todo;
};


export type MutationAddArgs = {
  id: Scalars['ID'];
  schedule: Scalars['Date'];
  title: Scalars['String'];
};


export type MutationRemoveArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateArgs = {
  id: Scalars['ID'];
  schedule: Scalars['Date'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  create?: Maybe<Todo>;
  readAll: Array<Todo>;
};


export type QueryCreateArgs = {
  schedule: Scalars['Date'];
  title: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  schedule: Scalars['Date'];
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

export type CreateQueryVariables = Exact<{
  title: Scalars['String'];
  schedule: Scalars['Date'];
}>;


export type CreateQuery = (
  { __typename?: 'Query' }
  & { create?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'schedule'>
  )> }
);

export type AddMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  schedule: Scalars['Date'];
}>;


export type AddMutation = (
  { __typename?: 'Mutation' }
  & { add: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'schedule'>
  ) }
);

export type UpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  schedule: Scalars['Date'];
}>;


export type UpdateMutation = (
  { __typename?: 'Mutation' }
  & { update: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'schedule'>
  ) }
);

export type RemoveMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'remove'>
);
