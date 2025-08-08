import {
  Auth,
  GoogleAuthProvider,
  OAuthProvider,
  User,
  UserCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPopup
} from "firebase/auth";
import { getServerToken, postRequest } from "./utils";
import { baseUrl, idTokenVerificationUrl, logEvent, serverSignOutUrl, serverTokenUrl } from ".";

const verifyIdToken = async (user: User) => {
  if (!idTokenVerificationUrl) {
    console.error("ID Token verification URL is not set.");
    return false
  }

  const idToken = await user.getIdToken();
  if (!idToken) {
    console.error("User ID token is not available.")
    return false
  }

  const response = await postRequest(idTokenVerificationUrl, { idToken })
  if (!response.ok) {
    console.error('Failed to verify ID token:', response.statusText)
    return false
  }

  if (logEvent) {
    logEvent('id_token_verified', {
      uid: user.uid,
    });
  }
  return true;
}

type SignInParams = {
  auth: Auth;
  email?: string;
  password?: string;
  provider?: GoogleAuthProvider | OAuthProvider;
  url?: string;
}

const signIn = async ({ auth, email, password, provider, url }: SignInParams) => {
  let userCredential: UserCredential;

  try {
    if (provider) {
      userCredential = await signInWithPopup(auth, provider);
    } else if (email && password) {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else if (email && url) {
      userCredential = await signInWithEmailLink(auth, email, url);
    } else if (serverTokenUrl) {
      const token = await getServerToken(serverTokenUrl);
      userCredential = await signInWithCustomToken(auth, token);
    } else {
      throw new Error("No valid sign-in method provided. Please provide either email/password, provider, or server token URL.");
    }
  } catch (error) {
    console.error("Error signing in with popup:", error);
    throw error; // Re-throw the error for further handling if needed
  }

  if (logEvent) {
    logEvent('signed_in', {
      uid: userCredential.user.uid,
    });
  }

  return userCredential;
}

const signOut = async (auth: Auth) => {
  const uid = auth.currentUser?.uid;
  let redirectUrl = baseUrl

  if (serverSignOutUrl) {
    const response = await postRequest(serverSignOutUrl)

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        if (logEvent) {
          logEvent('server_signed_out', {
            uid
          });
        }
        redirectUrl = data.redirectUrl || redirectUrl;
      }
    }
  }

  await auth.signOut();

  if (logEvent) {
    logEvent('signed_out', {
      uid
    });
  }

  window.location.href = redirectUrl;
  return true;
};

export {
  verifyIdToken,
  signIn,
  signOut
}
