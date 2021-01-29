import type { GraphQLClient } from 'graphql-request';
import type { Headers } from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { CreateQuery, CreateQueryVariables, ReadAllQuery, ReadAllQueryVariables } from '../types';

export const ReadAllDocument = gql`
    query readAll {
  readAll {
    id
    title
    schedule
  }
}
    `;
export const CreateDocument = gql`
    query create($title: String!, $schedule: Date!) {
  create(title: $title, schedule: $schedule) {
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
    readAll(variables?: ReadAllQueryVariables, requestHeaders?: Headers): Promise<ReadAllQuery> {
      return withWrapper(() => client.request<ReadAllQuery>(print(ReadAllDocument), variables, requestHeaders));
    },
    create(variables: CreateQueryVariables, requestHeaders?: Headers): Promise<CreateQuery> {
      return withWrapper(() => client.request<CreateQuery>(print(CreateDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;