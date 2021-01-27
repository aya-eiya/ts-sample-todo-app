export class Todo {
  constructor(id: string,title: string,schedule: Date) {
    this.id = id;
    this.title = title;
    this.schedule = schedule;
  }
  id: string;
  title: string;
  schedule: Date;
}