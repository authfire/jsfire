"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = exports.setApp = void 0;
let _app;
const setApp = (app) => {
    _app = app;
    return _app;
};
exports.setApp = setApp;
const getApp = () => {
    return _app;
};
exports.getApp = getApp;
