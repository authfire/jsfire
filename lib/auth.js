"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.verifyIdToken = void 0;
const auth_1 = require("firebase/auth");
const utils_1 = require("./utils");
const analytics_1 = require("./analytics");
const _1 = require(".");
const verifyIdToken = async (user, appCheck, analytics) => {
    if (!_1.idTokenVerificationUrl) {
        console.error("ID Token verification URL is not set.");
        return false;
    }
    const idToken = await user.getIdToken();
    if (!idToken) {
        console.error("User ID token is not available.");
        return false;
    }
    const response = await (0, utils_1.postRequest)(_1.idTokenVerificationUrl, appCheck, { idToken });
    if (!response.ok) {
        console.error('Failed to verify ID token:', response.statusText);
        return false;
    }
    (0, analytics_1.logEvent)(analytics, 'id_token_verified', {
        uid: user.uid,
    });
    return true;
};
exports.verifyIdToken = verifyIdToken;
const signIn = async ({ auth, email, password, provider, analytics }) => {
    let userCredential;
    try {
        if (provider) {
            userCredential = await (0, auth_1.signInWithPopup)(auth, provider);
        }
        else if (email && password) {
            userCredential = await (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
        }
        else if (_1.serverTokenUrl) {
            const token = await (0, utils_1.getServerToken)(_1.serverTokenUrl);
            userCredential = await (0, auth_1.signInWithCustomToken)(auth, token);
        }
        else {
            throw new Error("No valid sign-in method provided. Please provide either email/password, provider, or server token URL.");
        }
    }
    catch (error) {
        console.error("Error signing in with popup:", error);
        throw error; // Re-throw the error for further handling if needed
    }
    (0, analytics_1.logEvent)(analytics, 'signed_in', {
        uid: userCredential.user.uid,
    });
    return userCredential;
};
exports.signIn = signIn;
const signOut = async (auth, serverSignOutUrl, appCheck, redirectUrl = "/", analytics) => {
    const uid = auth.currentUser?.uid;
    if (serverSignOutUrl) {
        const response = await (0, utils_1.postRequest)(serverSignOutUrl, appCheck);
        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success') {
                (0, analytics_1.logEvent)(analytics, 'server_signed_out', {
                    uid
                });
                redirectUrl = data.redirectUrl || redirectUrl;
            }
        }
    }
    await auth.signOut();
    (0, analytics_1.logEvent)(analytics, 'signed_out', {
        uid
    });
    window.location.href = redirectUrl;
    return true;
};
exports.signOut = signOut;
