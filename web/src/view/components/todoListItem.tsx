import { Todo } from '#/domain/models/todo'
import React from 'react'

interface TodoListItemProps {
  item: Todo
  onSubmit: (todo: Todo) => void
  onRemove: (todo: Todo) => void
}

interface UpdateTodo {
  title: string
  schedule: string
}

interface TodoListItemState {
  editItem: UpdateTodo
  isEditMode: boolean
}

export default class TodoListItem extends React.Component<
  TodoListItemProps,
  TodoListItemState
> {
  constructor(props: TodoListItemProps) {
    super(props)
    this.state = {
      editItem: {
        title: props.item.title,
        schedule: props.item.schedule.toISOString(),
      },
      isEditMode: false,
    }
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onScheduleChange = this.onScheduleChange.bind(this)
  }

  onTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const title = event.target.value
    this.setState({
      editItem: {
        title,
        schedule: this.state.editItem.schedule,
      },
    })
  }

  onScheduleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target
    this.setState({
      editItem: {
        title: this.state.editItem.title,
        schedule: value,
      },
    })
  }

  render(): React.ReactNode {
    const { item, onSubmit, onRemove } = this.props
    const { editItem, isEditMode } = this.state
    return !isEditMode ? (
      <li
        className="flex flex-1 flex-row m-1 content-center"
        id={`todoItem_${item.id}`}
      >
        <div className="p-1 h-10 w-36 contents-center">{item.title}</div>
        <div className="p-1 h-10 w-72 content-center">
          {item.schedule.toUTCString()}
        </div>
        <div className="p-1 h-10 content-center">
          <button
            className="rounded p-1 w-16 bg-red-400"
            type="button"
            onClick={() => onRemove(item)}
          >
            remove
          </button>
        </div>
        <div className="p-1 h-10 content-center">
          <button
            className="rounded p-1 w-16 bg-blue-400"
            type="button"
            onClick={() => this.setState({ isEditMode: true })}
          >
            edit
          </button>
        </div>
      </li>
    ) : (
      <li
        className="flex flex-1 flex-row m-1 items-center"
        id={`todoItem_${item.id}`}
      >
        <div className="p-1 h-10 w-36 items-center">
          <input
            className="w-full bg-gray-200 rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2"
            type="text"
            name="title"
            value={editItem.title}
            onChange={this.onTitleChange}
          />
        </div>
        <div className="p-1 h-10 w-72 items-center">
          <input
            className="w-full bg-gray-200 rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2"
            type="text"
            name="schedule"
            value={editItem.schedule}
            onChange={this.onScheduleChange}
          />
        </div>
        <div className="p-1 h-10 items-center">
          <button
            className="rounded p-1 w-16 bg-blue-400"
            type="button"
            onClick={() => {
              const todo = item.copyWith({ ...editItem })
              if (todo !== item) {
                onSubmit(todo)
              }
              this.setState({ isEditMode: false })
            }}
          >
            update
          </button>
        </div>
        <div className="p-1 h-10 items-center">
          <button
            className="rounded p-1 w-16 bg-gray-300"
            type="button"
            onClick={() =>
              this.setState({
                editItem: {
                  title: item.title,
                  schedule: item.schedule.toUTCString(),
                },
                isEditMode: false,
              })
            }
          >
            cancel
          </button>
        </div>
      </li>
    )
  }
}
