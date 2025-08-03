"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.verifyIdToken = exports.getAuth = exports.setAuth = void 0;
const auth_1 = require("firebase/auth");
const const_1 = require("./const");
const app_check_1 = require("./app-check");
const analytics_1 = require("./analytics");
let _auth;
const setAuth = (app) => {
    _auth = (0, auth_1.getAuth)(app);
};
exports.setAuth = setAuth;
const getAuth = () => {
    return _auth;
};
exports.getAuth = getAuth;
const verifyIdToken = async (user) => {
    const idTokenVerificationUrl = (0, const_1.getIdTokenVerificationUrl)();
    if (!idTokenVerificationUrl) {
        throw new Error("ID Token verification URL is not set.");
    }
    const idToken = await user.getIdToken();
    const headers = {
        "Content-Type": "application/json"
    };
    if ((0, app_check_1.getAppCheck)()) {
        headers['X-Firebase-AppCheck'] = await (0, app_check_1.getAppCheckToken)();
    }
    // Send the token to your API route
    const response = await fetch(idTokenVerificationUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ idToken }),
        credentials: 'include',
    });
    if (response.ok) {
        (0, analytics_1.logEvent)('id_token_verified', {
            uid: user.uid,
        });
        return true;
    }
    console.error('Failed to verify ID token:', response.statusText);
    return false;
};
exports.verifyIdToken = verifyIdToken;
const signIn = async ({ email, password, provider }) => {
    const auth = getAuth();
    let userCredential;
    try {
        if (provider) {
            userCredential = await (0, auth_1.signInWithPopup)(auth, provider);
        }
        else if (email && password) {
            userCredential = await (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
        }
        else {
            throw new Error("Either provider or email/password must be provided for sign-in.");
        }
    }
    catch (error) {
        console.error("Error signing in with popup:", error);
        throw error; // Re-throw the error for further handling if needed
    }
    (0, analytics_1.logEvent)('signed_in', {
        uid: userCredential.user.uid,
    });
    return userCredential;
};
exports.signIn = signIn;
const signOut = async (redirectUrl = "/") => {
    const auth = getAuth();
    const serverSignOutUrl = (0, const_1.getServerSignOutUrl)();
    const uid = auth.currentUser?.uid;
    if (serverSignOutUrl) {
        const response = await fetch(serverSignOutUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-Firebase-AppCheck': await (0, app_check_1.getAppCheckToken)()
            },
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success') {
                (0, analytics_1.logEvent)('server_signed_out', {
                    uid
                });
                redirectUrl = data.redirectUrl || redirectUrl;
            }
        }
    }
    await auth.signOut();
    (0, analytics_1.logEvent)('signed_out', {
        uid
    });
    window.location.href = redirectUrl;
    return true;
};
exports.signOut = signOut;
