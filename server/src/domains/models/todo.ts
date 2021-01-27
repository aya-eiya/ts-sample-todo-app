import { Schedule } from './schedule';

export class TodoId {
  constructor(value: string) {
    this.value = value;
  }
  value: string;
}

export interface Todo {
  title: string
  schedule: Schedule
  id(): TodoId
}