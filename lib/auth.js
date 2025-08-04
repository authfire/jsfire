"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.verifyIdToken = exports.initializeAuth = void 0;
const auth_1 = require("firebase/auth");
const const_1 = require("./const");
const analytics_1 = require("./analytics");
const utils_1 = require("./utils");
let _auth;
const initializeAuth = (app) => {
    _auth = (0, auth_1.getAuth)(app);
    return _auth;
};
exports.initializeAuth = initializeAuth;
const verifyIdToken = async (user) => {
    const idTokenVerificationUrl = (0, const_1.getIdTokenVerificationUrl)();
    if (!idTokenVerificationUrl) {
        console.error("ID Token verification URL is not set.");
    }
    const idToken = await user.getIdToken();
    if (!idToken) {
        console.error("User ID token is not available.");
    }
    const response = await (0, utils_1.postRequest)(idTokenVerificationUrl, { idToken });
    if (!response.ok) {
        console.error('Failed to verify ID token:', response.statusText);
        return false;
    }
    (0, analytics_1.logEvent)('id_token_verified', {
        uid: user.uid,
    });
    return true;
};
exports.verifyIdToken = verifyIdToken;
const signIn = async ({ email, password, provider }) => {
    let userCredential;
    try {
        if (provider) {
            let authProvider;
            switch (provider) {
                case 'google':
                    authProvider = new auth_1.GoogleAuthProvider();
                    break;
                default:
                    authProvider = new auth_1.OAuthProvider(provider);
                    break;
            }
            userCredential = await (0, auth_1.signInWithPopup)(_auth, authProvider);
        }
        else if (email && password) {
            userCredential = await (0, auth_1.signInWithEmailAndPassword)(_auth, email, password);
        }
        else {
            const serverTokenUrl = (0, const_1.getServerTokenUrl)();
            if (!serverTokenUrl) {
                throw new Error("Either provider or email/password must be provided for sign-in.");
            }
            const token = await (0, utils_1.getServerToken)(serverTokenUrl);
            userCredential = await (0, auth_1.signInWithCustomToken)(_auth, token);
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
    const serverSignOutUrl = (0, const_1.getServerSignOutUrl)();
    const uid = _auth.currentUser?.uid;
    if (serverSignOutUrl) {
        const response = await (0, utils_1.postRequest)(serverSignOutUrl);
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
    await _auth.signOut();
    (0, analytics_1.logEvent)('signed_out', {
        uid
    });
    window.location.href = redirectUrl;
    return true;
};
exports.signOut = signOut;
