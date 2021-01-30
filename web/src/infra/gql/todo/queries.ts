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

export const update = gql`
mutation update($id: ID!, $title: String!, $schedule: Date!) {
  update(id: $id, title: $title, schedule: $schedule) {
    id
    title
    schedule
  }
}
`;

export const remove = gql`
mutation remove($id: ID!) {
  remove(id: $id)
}
`;