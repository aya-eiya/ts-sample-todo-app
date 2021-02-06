var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { gql } from 'graphql-request';
export var readAll = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query readAll {\n    readAll {\n      id\n      title\n      schedule\n    }\n  }\n"], ["\n  query readAll {\n    readAll {\n      id\n      title\n      schedule\n    }\n  }\n"])));
export var create = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query create($title: String!, $schedule: Date!) {\n    create(title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"], ["\n  query create($title: String!, $schedule: Date!) {\n    create(title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"])));
export var add = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation add($id: ID!, $title: String!, $schedule: Date!) {\n    add(id: $id, title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"], ["\n  mutation add($id: ID!, $title: String!, $schedule: Date!) {\n    add(id: $id, title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"])));
export var update = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  mutation update($id: ID!, $title: String!, $schedule: Date!) {\n    update(id: $id, title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"], ["\n  mutation update($id: ID!, $title: String!, $schedule: Date!) {\n    update(id: $id, title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"])));
export var remove = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  mutation remove($id: ID!) {\n    remove(id: $id)\n  }\n"], ["\n  mutation remove($id: ID!) {\n    remove(id: $id)\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
