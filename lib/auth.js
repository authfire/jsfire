"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.verifyIdToken = void 0;
const auth_1 = require("firebase/auth");
const utils_1 = require("./utils");
const analytics_1 = require("./analytics");
const verifyIdToken = async (user, url, appCheckToken, analytics) => {
    if (!url) {
        console.error("ID Token verification URL is not set.");
    }
    const idToken = await user.getIdToken();
    if (!idToken) {
        console.error("User ID token is not available.");
    }
    const response = await (0, utils_1.postRequest)(url, appCheckToken, { idToken });
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
const signIn = async ({ auth, email, password, provider, serverTokenUrl, analytics }) => {
    let userCredential;
    try {
        if (provider) {
            userCredential = await (0, auth_1.signInWithPopup)(auth, provider);
        }
        else if (email && password) {
            userCredential = await (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
        }
        else if (serverTokenUrl) {
            const token = await (0, utils_1.getServerToken)(serverTokenUrl);
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
const signOut = async (auth, serverSignOutUrl, appCheckToken, redirectUrl = "/", analytics) => {
    const uid = auth.currentUser?.uid;
    if (serverSignOutUrl) {
        const response = await (0, utils_1.postRequest)(serverSignOutUrl, appCheckToken);
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
