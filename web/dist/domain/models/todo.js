var Todo = /** @class */ (function () {
    function Todo(id, title, schedule) {
        this.id = id;
        this.title = title;
        if (schedule instanceof Date) {
            this.schedule = schedule;
        }
        else {
            this.schedule = new Date(schedule);
        }
    }
    Todo.newItem = function (_a) {
        var title = _a.title, schedule = _a.schedule;
        return new Todo('new', title, schedule);
    };
    Todo.of = function (_a) {
        var id = _a.id, title = _a.title, schedule = _a.schedule;
        return new Todo(id, title, schedule);
    };
    Todo.prototype.copyWith = function (_a) {
        var title = _a.title, schedule = _a.schedule;
        if (schedule instanceof Date) {
            return new Todo(this.id, title, schedule);
        }
        else {
            try {
                var _schedule = new Date(schedule);
                return new Todo(this.id, title, _schedule);
            }
            catch (_b) {
                return new Todo(this.id, title, this.schedule);
            }
        }
    };
    return Todo;
}());
export { Todo };
