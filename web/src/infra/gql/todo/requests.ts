import type { GraphQLClient } from 'graphql-request';
import type { Headers as HeadersInit } from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { AddMutation, AddMutationVariables, CreateQuery, CreateQueryVariables, ReadAllQuery, ReadAllQueryVariables, RemoveMutation, RemoveMutationVariables, UpdateMutation, UpdateMutationVariables } from '../types';

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
export const AddDocument = gql`
    mutation add($id: ID!, $title: String!, $schedule: Date!) {
  add(id: $id, title: $title, schedule: $schedule) {
    id
    title
    schedule
  }
}
    `;
export const UpdateDocument = gql`
    mutation update($id: ID!, $title: String!, $schedule: Date!) {
  update(id: $id, title: $title, schedule: $schedule) {
    id
    title
    schedule
  }
}
    `;
export const RemoveDocument = gql`
    mutation remove($id: ID!) {
  remove(id: $id)
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    readAll(variables?: ReadAllQueryVariables, requestHeaders?: HeadersInit): Promise<ReadAllQuery> {
      return withWrapper(() => client.request<ReadAllQuery>(print(ReadAllDocument), variables, requestHeaders));
    },
    create(variables: CreateQueryVariables, requestHeaders?: HeadersInit): Promise<CreateQuery> {
      return withWrapper(() => client.request<CreateQuery>(print(CreateDocument), variables, requestHeaders));
    },
    add(variables: AddMutationVariables, requestHeaders?: HeadersInit): Promise<AddMutation> {
      return withWrapper(() => client.request<AddMutation>(print(AddDocument), variables, requestHeaders));
    },
    update(variables: UpdateMutationVariables, requestHeaders?: HeadersInit): Promise<UpdateMutation> {
      return withWrapper(() => client.request<UpdateMutation>(print(UpdateDocument), variables, requestHeaders));
    },
    remove(variables: RemoveMutationVariables, requestHeaders?: HeadersInit): Promise<RemoveMutation> {
      return withWrapper(() => client.request<RemoveMutation>(print(RemoveDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;