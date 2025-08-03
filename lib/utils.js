"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRequest = void 0;
const app_check_1 = require("./app-check");
const postRequest = async (url, data = {}) => {
    const headers = {
        "Content-Type": "application/json"
    };
    if ((0, app_check_1.getAppCheck)()) {
        headers['X-Firebase-AppCheck'] = await (0, app_check_1.getAppCheckToken)();
    }
    return await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
        credentials: 'include',
    });
};
exports.postRequest = postRequest;
