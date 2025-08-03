"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = exports.setApp = void 0;
const auth_1 = require("./auth");
const app_check_1 = require("./app-check");
const firestore_1 = require("./firestore");
let _app;
const setApp = (app) => {
    _app = app;
    (0, app_check_1.setAppCheck)(app);
    (0, auth_1.setAuth)(app);
    (0, firestore_1.setFirestore)(app);
};
exports.setApp = setApp;
const getApp = () => {
    return _app;
};
exports.getApp = getApp;
