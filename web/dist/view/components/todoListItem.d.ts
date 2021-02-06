import { Todo } from '#/domain/models/todo';
import React from 'react';
interface TodoListItemProps {
    item: Todo;
    onSubmit: (todo: Todo) => void;
    onRemove: (todo: Todo) => void;
}
interface UpdateTodo {
    title: string;
    schedule: string;
}
interface TodoListItemState {
    editItem: UpdateTodo;
    isEditMode: boolean;
}
export default class TodoListItem extends React.Component<TodoListItemProps, TodoListItemState> {
    constructor(props: TodoListItemProps);
    onTitleChange(event: React.ChangeEvent<HTMLInputElement>): void;
    onScheduleChange(event: React.ChangeEvent<HTMLInputElement>): void;
    render(): React.ReactNode;
}
export {};
