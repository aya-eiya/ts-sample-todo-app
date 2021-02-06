var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { print } from 'graphql';
import gql from 'graphql-tag';
export var ReadAllDocument = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query readAll {\n    readAll {\n      id\n      title\n      schedule\n    }\n  }\n"], ["\n  query readAll {\n    readAll {\n      id\n      title\n      schedule\n    }\n  }\n"])));
export var CreateDocument = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query create($title: String!, $schedule: Date!) {\n    create(title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"], ["\n  query create($title: String!, $schedule: Date!) {\n    create(title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"])));
export var AddDocument = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation add($id: ID!, $title: String!, $schedule: Date!) {\n    add(id: $id, title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"], ["\n  mutation add($id: ID!, $title: String!, $schedule: Date!) {\n    add(id: $id, title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"])));
export var UpdateDocument = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  mutation update($id: ID!, $title: String!, $schedule: Date!) {\n    update(id: $id, title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"], ["\n  mutation update($id: ID!, $title: String!, $schedule: Date!) {\n    update(id: $id, title: $title, schedule: $schedule) {\n      id\n      title\n      schedule\n    }\n  }\n"])));
export var RemoveDocument = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  mutation remove($id: ID!) {\n    remove(id: $id)\n  }\n"], ["\n  mutation remove($id: ID!) {\n    remove(id: $id)\n  }\n"])));
var defaultWrapper = function (sdkFunction) { return sdkFunction(); };
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function getSdk(client, withWrapper) {
    if (withWrapper === void 0) { withWrapper = defaultWrapper; }
    return {
        readAll: function (variables, requestHeaders) {
            return withWrapper(function () {
                return client.request(print(ReadAllDocument), variables, requestHeaders);
            });
        },
        create: function (variables, requestHeaders) {
            return withWrapper(function () {
                return client.request(print(CreateDocument), variables, requestHeaders);
            });
        },
        add: function (variables, requestHeaders) {
            return withWrapper(function () {
                return client.request(print(AddDocument), variables, requestHeaders);
            });
        },
        update: function (variables, requestHeaders) {
            return withWrapper(function () {
                return client.request(print(UpdateDocument), variables, requestHeaders);
            });
        },
        remove: function (variables, requestHeaders) {
            return withWrapper(function () {
                return client.request(print(RemoveDocument), variables, requestHeaders);
            });
        },
    };
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
