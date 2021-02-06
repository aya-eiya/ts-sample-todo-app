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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
var TodoListItem = /** @class */ (function (_super) {
    __extends(TodoListItem, _super);
    function TodoListItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            editItem: {
                title: props.item.title,
                schedule: props.item.schedule.toISOString(),
            },
            isEditMode: false,
        };
        _this.onTitleChange = _this.onTitleChange.bind(_this);
        _this.onScheduleChange = _this.onScheduleChange.bind(_this);
        return _this;
    }
    TodoListItem.prototype.onTitleChange = function (event) {
        var title = event.target.value;
        this.setState({
            editItem: {
                title: title,
                schedule: this.state.editItem.schedule,
            },
        });
    };
    TodoListItem.prototype.onScheduleChange = function (event) {
        var value = event.target.value;
        this.setState({
            editItem: {
                title: this.state.editItem.title,
                schedule: value,
            },
        });
    };
    TodoListItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, item = _a.item, onSubmit = _a.onSubmit, onRemove = _a.onRemove;
        var _b = this.state, editItem = _b.editItem, isEditMode = _b.isEditMode;
        return !isEditMode ? (<li className="flex flex-1 flex-row m-1 content-center" id={"todoItem_" + item.id}>
        <div className="p-1 h-10 w-36 contents-center">{item.title}</div>
        <div className="p-1 h-10 w-72 content-center">
          {item.schedule.toUTCString()}
        </div>
        <div className="p-1 h-10 content-center">
          <button className="rounded p-1 w-16 bg-red-400" type="button" onClick={function () { return onRemove(item); }}>
            remove
          </button>
        </div>
        <div className="p-1 h-10 content-center">
          <button className="rounded p-1 w-16 bg-blue-400" type="button" onClick={function () { return _this.setState({ isEditMode: true }); }}>
            edit
          </button>
        </div>
      </li>) : (<li className="flex flex-1 flex-row m-1 items-center" id={"todoItem_" + item.id}>
        <div className="p-1 h-10 w-36 items-center">
          <input className="w-full bg-gray-200 rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2" type="text" name="title" value={editItem.title} onChange={this.onTitleChange}/>
        </div>
        <div className="p-1 h-10 w-72 items-center">
          <input className="w-full bg-gray-200 rounded focus:outline-none focus:ring focus:border-blue-300 m-1 h-8 p-1 pl-2" type="text" name="schedule" value={editItem.schedule} onChange={this.onScheduleChange}/>
        </div>
        <div className="p-1 h-10 items-center">
          <button className="rounded p-1 w-16 bg-blue-400" type="button" onClick={function () {
            var todo = item.copyWith(__assign({}, editItem));
            if (todo !== item) {
                onSubmit(todo);
            }
            _this.setState({ isEditMode: false });
        }}>
            update
          </button>
        </div>
        <div className="p-1 h-10 items-center">
          <button className="rounded p-1 w-16 bg-gray-300" type="button" onClick={function () {
            return _this.setState({
                editItem: {
                    title: item.title,
                    schedule: item.schedule.toUTCString(),
                },
                isEditMode: false,
            });
        }}>
            cancel
          </button>
        </div>
      </li>);
    };
    return TodoListItem;
}(React.Component));
export default TodoListItem;
