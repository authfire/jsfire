"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.verifyIdToken = void 0;
const auth_1 = require("firebase/auth");
const utils_1 = require("./utils");
const _1 = require(".");
const verifyIdToken = async (user) => {
    if (!_1.idTokenVerificationUrl) {
        console.error("ID Token verification URL is not set.");
        return false;
    }
    const idToken = await user.getIdToken();
    if (!idToken) {
        console.error("User ID token is not available.");
        return false;
    }
    const response = await (0, utils_1.postRequest)(_1.idTokenVerificationUrl, { idToken });
    if (!response.ok) {
        console.error('Failed to verify ID token:', response.statusText);
        return false;
    }
    if (_1.logEvent) {
        (0, _1.logEvent)('id_token_verified', {
            uid: user.uid,
        });
    }
    return true;
};
exports.verifyIdToken = verifyIdToken;
const signIn = async ({ auth, email, password, provider }) => {
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
    if (_1.logEvent) {
        (0, _1.logEvent)('signed_in', {
            uid: userCredential.user.uid,
        });
    }
    return userCredential;
};
exports.signIn = signIn;
const signOut = async (auth) => {
    const uid = auth.currentUser?.uid;
    let redirectUrl = _1.baseUrl;
    if (_1.serverSignOutUrl) {
        const response = await (0, utils_1.postRequest)(_1.serverSignOutUrl);
        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success') {
                if (_1.logEvent) {
                    (0, _1.logEvent)('server_signed_out', {
                        uid
                    });
                }
                redirectUrl = data.redirectUrl || redirectUrl;
            }
        }
    }
    await auth.signOut();
    if (_1.logEvent) {
        (0, _1.logEvent)('signed_out', {
            uid
        });
    }
    window.location.href = redirectUrl;
    return true;
};
exports.signOut = signOut;
