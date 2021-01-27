import { GraphQLClient } from 'graphql-request';
import { HeadersInit } from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
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

export type Query = {
  __typename?: 'Query';
  add: Todo;
  create?: Maybe<Todo>;
  readAll: Array<Todo>;
  update: Todo;
};


export type QueryAddArgs = {
  id: Scalars['ID'];
  schedule: Scalars['date'];
  title: Scalars['String'];
};


export type QueryCreateArgs = {
  schedule: Scalars['date'];
  title: Scalars['String'];
};


export type QueryUpdateArgs = {
  id: Scalars['ID'];
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


export const ReadAllDocument = gql`
    query readAll {
  readAll {
    id
    title
    schedule
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    readAll(variables?: ReadAllQueryVariables, requestHeaders?: HeadersInit): Promise<ReadAllQuery> {
      return withWrapper(() => client.request<ReadAllQuery>(print(ReadAllDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;