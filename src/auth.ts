import { Auth, AuthProvider, GoogleAuthProvider, OAuthProvider, User, UserCredential, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getIdTokenVerificationUrl, getServerSignOutUrl } from "./const";
import { FirebaseApp } from "firebase/app";
import { logEvent } from "./analytics";
import { postRequest } from "./utils";

let _auth: Auth;

const initializeAuth = (app: FirebaseApp) => {
  _auth = getAuth(app);
  return _auth
}

const verifyIdToken = async (user: User) => {
  const idTokenVerificationUrl = getIdTokenVerificationUrl();
  if (!idTokenVerificationUrl) {
    console.error("ID Token verification URL is not set.");
  }

  const idToken = await user.getIdToken();
  if (!idToken) {
    console.error("User ID token is not available.");
  }

  const response = await postRequest(idTokenVerificationUrl, { idToken })
  if (response.ok) {
    console.error('Failed to verify ID token:', response.statusText);
    return false;
  }

  logEvent('id_token_verified', {
    uid: user.uid,
  });
  return true;
}

type SignInParams = {
  email?: string;
  password?: string;
  provider?: string;
}

const signIn = async ({ email, password, provider }: SignInParams) => {
  let userCredential: UserCredential;

  try {
    if (provider) {
      let authProvider: AuthProvider;
      switch (provider) {
        case 'google':
          authProvider = new GoogleAuthProvider();
          break;
        default:
          authProvider = new OAuthProvider(provider);
          break;
      }
      userCredential = await signInWithPopup(_auth, authProvider);
    } else if (email && password) {
      userCredential = await signInWithEmailAndPassword(_auth, email, password);
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
  const serverSignOutUrl = getServerSignOutUrl();
  const uid = _auth.currentUser?.uid;

  if (serverSignOutUrl) {
    const response = await postRequest(serverSignOutUrl)

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

  await _auth.signOut();

  logEvent('signed_out', {
    uid
  });

  window.location.href = redirectUrl;
  return true;
};

export {
  initializeAuth,
  verifyIdToken,
  signIn,
  signOut
}
