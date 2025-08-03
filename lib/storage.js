"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorage = exports.setStorage = void 0;
const storage_1 = require("firebase/storage");
let _storage;
const setStorage = (app) => {
    _storage = (0, storage_1.getStorage)(app);
    return _storage;
};
exports.setStorage = setStorage;
const getStorage = () => {
    return _storage;
};
exports.getStorage = getStorage;
