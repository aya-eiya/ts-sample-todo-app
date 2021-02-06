var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Todo } from '#/domain/models/todo';
import React from 'react';
var TodoInput = /** @class */ (function (_super) {
    __extends(TodoInput, _super);
    function TodoInput(props) {
        var _a, _b;
        var _this = _super.call(this, props) || this;
        _this.state = {
            todo: props.newItem,
            editTodo: {
                title: ((_a = props.newItem) === null || _a === void 0 ? void 0 : _a.title) || '',
                schedule: (((_b = props.newItem) === null || _b === void 0 ? void 0 : _b.schedule) || new Date()).toISOString(),
            },
        };
        _this.onSubmit = props.onSubmit.bind(_this);
        _this.onTitleChange = _this.onTitleChange.bind(_this);
        _this.onScheduleChange = _this.onScheduleChange.bind(_this);
        return _this;
    }
    TodoInput.prototype.onTitleChange = function (event) {
        var _a;
        var title = event.target.value;
        this.setState({
            editTodo: {
                title: title,
                schedule: this.state.editTodo.schedule,
            },
            todo: Todo.newItem({
                title: title,
                schedule: ((_a = this.state.todo) === null || _a === void 0 ? void 0 : _a.schedule) || new Date(),
            }),
        });
    };
    TodoInput.prototype.onScheduleChange = function (event) {
        var value = event.target.value;
        this.setState({
            editTodo: {
                title: this.state.editTodo.title,
                schedule: value,
            },
        });
        try {
            var schedule = new Date(value);
            this.setState({
                todo: Todo.newItem({ title: this.state.editTodo.title, schedule: schedule }),
            });
        }
        catch (e) {
            console.log(e);
        }
    };
    TodoInput.prototype.render = function () {
        var _this = this;
        return (<form className="grid grid-cols-5 gap-x-1">
        <div className="m-1 h-8 p-1 content-center">
          <label htmlFor="title">Title</label>
        </div>
        <div className="col-span-3">
          <input type="text" name="title" className=" bg-gray-200 w-full rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2" value={this.state.editTodo.title} onChange={this.onTitleChange}/>
        </div>
        <div className="row-span-2 flex p-1 justify-end items-end">
          <button className="rounded p-1 w-20 h-8 bg-blue-200" type="button" onClick={function () {
            if (_this.state.todo) {
                _this.onSubmit(_this.state.todo);
            }
        }}>
            add
          </button>
        </div>
        <div className="m-1 h-8 p-1 content-center">
          <label htmlFor="schedule">Schedule</label>
        </div>
        <div className="col-span-3">
          <input type="text" name="schedule" className=" bg-gray-200 w-full rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2" value={this.state.editTodo.schedule} onChange={this.onScheduleChange}/>
        </div>
      </form>);
    };
    return TodoInput;
}(React.Component));
export default TodoInput;
