import { gql } from 'graphql-request';

export const readAll = gql`
query readAll {
  readAll {
     id
     title
     schedule
  }
}`;