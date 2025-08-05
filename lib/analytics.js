"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = void 0;
const analytics_1 = require("firebase/analytics");
const logEvent = (analytics, eventName, eventParams) => {
    if (!analytics)
        return;
    (0, analytics_1.logEvent)(analytics, eventName, eventParams);
};
exports.logEvent = logEvent;
