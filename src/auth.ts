import { Auth, AuthProvider, User, UserCredential, getAuth as initializeAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getIdTokenVerificationUrl, getServerSignOutUrl } from "./const";
import { FirebaseApp } from "firebase/app";
import { getAppCheck, getAppCheckToken } from "./app-check";
import { logEvent } from "./analytics";

let _auth: Auth;

const setAuth = (app: FirebaseApp) => {
  _auth = initializeAuth(app);
}

const getAuth = () => {
  return _auth;
}

const verifyIdToken = async (user: User) => {
  const idTokenVerificationUrl = getIdTokenVerificationUrl();

  if (!idTokenVerificationUrl) {
    throw new Error("ID Token verification URL is not set.");
  }

  const idToken = await user.getIdToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  }

  if (getAppCheck()) {
    headers['X-Firebase-AppCheck'] = await getAppCheckToken();
  }

  // Send the token to your API route
  const response = await fetch(idTokenVerificationUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ idToken }),
    credentials: 'include',
  });

  if (response.ok) {
    logEvent('id_token_verified', {
      uid: user.uid,
    });
    return true;
  }

  console.error('Failed to verify ID token:', response.statusText);
  return false;
}

type SignInParams = {
  email?: string;
  password?: string;
  provider?: AuthProvider;
}

const signIn = async ({ email, password, provider }: SignInParams) => {
  const auth = getAuth();
  let userCredential: UserCredential;

  try {
    if (provider) {
      userCredential = await signInWithPopup(auth, provider);
    } else if (email && password) {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else {
      throw new Error("Either provider or email/password must be provided for sign-in.");
    }
  } catch (error) {
    console.error("Error signing in with popup:", error);
    throw error; // Re-throw the error for further handling if needed
  }

  logEvent('signed_in', {
    uid: userCredential.user.uid,
  });

  return userCredential;
}

const signOut = async (redirectUrl: string = "/") => {
  const auth = getAuth();
  const serverSignOutUrl = getServerSignOutUrl();
  const uid = auth.currentUser?.uid;

  if (serverSignOutUrl) {
    const response = await fetch(serverSignOutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-Firebase-AppCheck': await getAppCheckToken()
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        logEvent('server_signed_out', {
          uid
        });
        redirectUrl = data.redirectUrl || redirectUrl;
      }
    }
  }

  await auth.signOut();

  logEvent('signed_out', {
    uid
  });

  window.location.href = redirectUrl;
  return true;
};

export {
  setAuth,
  getAuth,
  verifyIdToken,
  signIn,
  signOut
}
