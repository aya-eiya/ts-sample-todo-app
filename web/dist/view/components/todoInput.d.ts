import { Todo } from '#/domain/models/todo';
import React from 'react';
interface TodoInputProp {
    onSubmit: (todo: Todo) => void;
    newItem: Todo | undefined;
}
interface TodoInputState {
    todo: Todo | undefined;
    editTodo: {
        title: string;
        schedule: string;
    };
}
export default class TodoInput extends React.Component<TodoInputProp, TodoInputState> {
    constructor(props: TodoInputProp);
    onSubmit: (todo: Todo) => void;
    onTitleChange(event: React.ChangeEvent<HTMLInputElement>): void;
    onScheduleChange(event: React.ChangeEvent<HTMLInputElement>): void;
    render(): React.ReactNode;
}
export {};
