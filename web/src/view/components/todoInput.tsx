import { Todo, DomainTodo } from '#/domain/models/todo'
import React from 'react'

interface TodoInputProp {
  onSubmit: (todo: Todo) => void
  newItem: Todo | undefined
}
interface TodoInputState {
  todo: Todo | undefined
  editTodo: {
    title: string
    schedule: string
  }
}

export default class TodoInput extends React.Component<
  TodoInputProp,
  TodoInputState
> {
  constructor(props: TodoInputProp) {
    super(props)
    this.state = {
      todo: props.newItem,
      editTodo: {
        title: props.newItem?.title || '',
        schedule: (props.newItem?.schedule || new Date()).toISOString(),
      },
    }
    this.onSubmit = props.onSubmit.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onScheduleChange = this.onScheduleChange.bind(this)
  }

  onSubmit: (todo: Todo) => void

  onTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const title = event.target.value
    this.setState({
      editTodo: {
        title,
        schedule: this.state.editTodo.schedule,
      },
      todo: DomainTodo.newItem({
        title,
        schedule: this.state.todo?.schedule || new Date(),
      }),
    })
  }

  onScheduleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target
    this.setState({
      editTodo: {
        title: this.state.editTodo.title,
        schedule: value,
      },
    })
    try {
      const schedule = new Date(value)
      this.setState({
        todo: DomainTodo.newItem({
          title: this.state.editTodo.title,
          schedule,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }

  render(): React.ReactNode {
    return (
      <form className="grid grid-cols-5 gap-x-1">
        <div className="m-1 h-8 p-1 content-center">
          <label htmlFor="title">Title</label>
        </div>
        <div className="col-span-3">
          <input
            type="text"
            name="title"
            className=" bg-gray-200 w-full rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2"
            value={this.state.editTodo.title}
            onChange={this.onTitleChange}
          />
        </div>
        <div className="row-span-2 flex p-1 justify-end items-end">
          <button
            className="rounded p-1 w-20 h-8 bg-blue-200"
            type="button"
            onClick={() => {
              if (this.state.todo) {
                this.onSubmit(this.state.todo)
              }
            }}
          >
            add
          </button>
        </div>
        <div className="m-1 h-8 p-1 content-center">
          <label htmlFor="schedule">Schedule</label>
        </div>
        <div className="col-span-3">
          <input
            type="text"
            name="schedule"
            className=" bg-gray-200 w-full rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2"
            value={this.state.editTodo.schedule}
            onChange={this.onScheduleChange}
          />
        </div>
      </form>
    )
  }
}
