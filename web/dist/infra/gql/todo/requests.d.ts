import type { GraphQLClient } from 'graphql-request';
import type { Headers as HeadersInit } from 'graphql-request/dist/types.dom';
import { AddMutation, AddMutationVariables, CreateQuery, CreateQueryVariables, ReadAllQuery, RemoveMutation, RemoveMutationVariables, UpdateMutation, UpdateMutationVariables } from '../types';
export declare const ReadAllDocument: import("graphql").DocumentNode;
export declare const CreateDocument: import("graphql").DocumentNode;
export declare const AddDocument: import("graphql").DocumentNode;
export declare const UpdateDocument: import("graphql").DocumentNode;
export declare const RemoveDocument: import("graphql").DocumentNode;
export declare type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;
export declare function getSdk(client: GraphQLClient, withWrapper?: SdkFunctionWrapper): {
    readAll(variables?: import("../types").Exact<{
        [key: string]: never;
    }> | undefined, requestHeaders?: HeadersInit | undefined): Promise<ReadAllQuery>;
    create(variables: CreateQueryVariables, requestHeaders?: HeadersInit | undefined): Promise<CreateQuery>;
    add(variables: AddMutationVariables, requestHeaders?: HeadersInit | undefined): Promise<AddMutation>;
    update(variables: UpdateMutationVariables, requestHeaders?: HeadersInit | undefined): Promise<UpdateMutation>;
    remove(variables: RemoveMutationVariables, requestHeaders?: HeadersInit | undefined): Promise<RemoveMutation>;
};
export declare type Sdk = ReturnType<typeof getSdk>;
