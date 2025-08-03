"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppCheckToken = exports.getAppCheck = exports.setAppCheck = void 0;
const const_1 = require("./const");
const app_check_1 = require("firebase/app-check");
let _appCheck;
const setAppCheck = (app) => {
    const recaptchaSiteKey = (0, const_1.getRecaptchaSiteKey)();
    if (!recaptchaSiteKey) {
        return;
    }
    _appCheck = (0, app_check_1.initializeAppCheck)(app, {
        provider: new app_check_1.ReCaptchaV3Provider(recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
    });
    return _appCheck;
};
exports.setAppCheck = setAppCheck;
const getAppCheck = () => {
    return _appCheck;
};
exports.getAppCheck = getAppCheck;
const getAppCheckToken = async (forceRefresh = false) => {
    if (_appCheck === undefined) {
        throw new Error("App Check is not initialized. Please call setAppCheck() with a FirebaseApp instance.");
    }
    const result = await (0, app_check_1.getToken)(_appCheck, forceRefresh);
    return result.token;
};
exports.getAppCheckToken = getAppCheckToken;
