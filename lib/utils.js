"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerToken = exports.postRequest = void 0;
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
const getServerToken = async (serverTokenUrl) => {
    const response = await postRequest(serverTokenUrl);
    if (!response.ok) {
        throw new Error("Failed to get server token: " + response.statusText);
    }
    const token = await response.json();
    if (!token.value) {
        throw new Error("No token received");
    }
    return token.value;
};
exports.getServerToken = getServerToken;
