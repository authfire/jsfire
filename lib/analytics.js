"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = exports.getAnalytics = exports.setAnalytics = void 0;
const analytics_1 = require("firebase/analytics");
let _analytics;
const setAnalytics = (app) => {
    _analytics = (0, analytics_1.getAnalytics)(app);
    return _analytics;
};
exports.setAnalytics = setAnalytics;
const getAnalytics = () => {
    return _analytics;
};
exports.getAnalytics = getAnalytics;
const logEvent = (eventName, eventParams) => {
    if (!_analytics) {
        throw new Error("Analytics is not initialized. Please call setAnalytics() with a FirebaseApp instance.");
    }
    (0, analytics_1.logEvent)(_analytics, eventName, eventParams);
};
exports.logEvent = logEvent;
