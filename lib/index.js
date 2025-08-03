"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const app_1 = require("firebase/app");
const app_2 = require("./app");
const app_check_1 = require("./app-check");
const auth_1 = require("./auth");
const analytics_1 = require("./analytics");
const firestore_1 = require("./firestore");
const storage_1 = require("./storage");
const const_1 = require("./const");
const initialize = (options, idTokenVerificationUrl, serverSignOutUrl, serverTokenUrl, recaptchaSiteKey) => {
    if (idTokenVerificationUrl)
        (0, const_1.setIdTokenVerificationUrl)(idTokenVerificationUrl);
    if (serverSignOutUrl)
        (0, const_1.setServerSignOutUrl)(serverSignOutUrl);
    if (serverTokenUrl)
        (0, const_1.setServerTokenUrl)(serverTokenUrl);
    if (recaptchaSiteKey)
        (0, const_1.setRecaptchaSiteKey)(recaptchaSiteKey);
    const app = (0, app_1.initializeApp)(options);
    (0, app_2.setApp)(app);
    const appCheck = (0, app_check_1.setAppCheck)(app);
    const auth = (0, auth_1.initializeAuth)(app);
    const analytics = (0, analytics_1.setAnalytics)(app);
    const firestore = (0, firestore_1.setFirestore)(app);
    const storage = (0, storage_1.setStorage)(app);
    return {
        app,
        appCheck,
        auth,
        analytics,
        firestore,
        storage,
        getAppCheckToken: app_check_1.getAppCheckToken,
        verifyIdToken: auth_1.verifyIdToken,
        signIn: auth_1.signIn,
        signOut: auth_1.signOut,
        logEvent: analytics_1.logEvent
    };
};
exports.initialize = initialize;
