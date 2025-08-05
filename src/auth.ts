import { Auth, GoogleAuthProvider, OAuthProvider, User, UserCredential, signInWithCustomToken, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getServerToken, postRequest } from "./utils";
import { Analytics } from "firebase/analytics";
import { logEvent } from "./analytics";

const verifyIdToken = async (user: User, url: string, appCheckToken?: string, analytics?: Analytics) => {
  if (!url) {
    console.error("ID Token verification URL is not set.");
  }

  const idToken = await user.getIdToken();
  if (!idToken) {
    console.error("User ID token is not available.");
  }

  const response = await postRequest(url, appCheckToken, { idToken })
  if (!response.ok) {
    console.error('Failed to verify ID token:', response.statusText);
    return false;
  }

  logEvent(analytics, 'id_token_verified', {
    uid: user.uid,
  });
  return true;
}

type SignInParams = {
  auth: Auth;
  email?: string;
  password?: string;
  provider?: GoogleAuthProvider | OAuthProvider;
  serverTokenUrl?: string;
  analytics?: Analytics;
}

const signIn = async ({ auth, email, password, provider, serverTokenUrl, analytics }: SignInParams) => {
  let userCredential: UserCredential;

  try {
    if (provider) {
      userCredential = await signInWithPopup(auth, provider);
    } else if (email && password) {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
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

  logEvent(analytics, 'signed_in', {
    uid: userCredential.user.uid,
  });

  return userCredential;
}

const signOut = async (auth: Auth, serverSignOutUrl: string, appCheckToken?: string, redirectUrl: string = "/", analytics?: Analytics) => {
  const uid = auth.currentUser?.uid;

  if (serverSignOutUrl) {
    const response = await postRequest(serverSignOutUrl, appCheckToken)

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        logEvent(analytics, 'server_signed_out', {
          uid
        });
        redirectUrl = data.redirectUrl || redirectUrl;
      }
    }
  }

  await auth.signOut();

  logEvent(analytics, 'signed_out', {
    uid
  });

  window.location.href = redirectUrl;
  return true;
};

export {
  verifyIdToken,
  signIn,
  signOut
}
