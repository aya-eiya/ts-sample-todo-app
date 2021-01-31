export class Todo {
  static newItem({ title, schedule }: { title: string; schedule: Date| number; }): Todo {
    return new Todo('new', title, schedule);
  }
  static of({id,title,schedule}: {id: string; title: string; schedule: Date| number; }): Todo {
    return new Todo(id,title,schedule);
  }
  constructor(id: string,title: string,schedule: Date | number) {
    this.id = id;
    this.title = title;
    if(schedule instanceof Date) { this.schedule = schedule; }
    else { this.schedule = new Date(schedule); }
  }
  id: string;
  title: string;
  schedule: Date;

  copyWith({title, schedule}: { title: string; schedule: Date; }): Todo {
    return new Todo(this.id,title,schedule);
  }
}