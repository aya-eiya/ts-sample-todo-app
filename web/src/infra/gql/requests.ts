import { GraphQLClient } from 'graphql-request';
import { Headers } from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { ReadAllQuery, ReadAllQueryVariables } from './types';

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
    readAll(variables?: ReadAllQueryVariables, requestHeaders?: Headers): Promise<ReadAllQuery> {
      return withWrapper(() => client.request<ReadAllQuery>(print(ReadAllDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;