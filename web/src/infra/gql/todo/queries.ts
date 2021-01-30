import { gql } from 'graphql-request';

export const readAll = gql`
query readAll {
  readAll {
     id
     title
     schedule
  }
}`;

export const create = gql`
query create($title: String!, $schedule: Date!) {
  create(title: $title, schedule: $schedule) {
    id
    title
    schedule
  }
}
`;

export const add = gql`
mutation add($id: ID!, $title: String!, $schedule: Date!) {
  add(id: $id, title: $title, schedule: $schedule) {
    id
    title
    schedule
  }
}
`;