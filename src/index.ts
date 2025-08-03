import { FirebaseOptions, initializeApp } from "firebase/app"
import { setApp } from "./app"
import { getAppCheckToken, setAppCheck } from "./app-check"
import { setAuth, signIn, signOut, verifyIdToken } from "./auth"
import { logEvent, setAnalytics } from "./analytics"
import { setFirestore } from "./firestore"
import { setStorage } from "./storage"
import { setIdTokenVerificationUrl, setRecaptchaSiteKey, setServerSignOutUrl } from "./const"

const initialize = (options: FirebaseOptions, idTokenVerificationUrl?: string, serverSignOutUrl?: string, recaptchaSiteKey?: string) => {
  if (idTokenVerificationUrl) setIdTokenVerificationUrl(idTokenVerificationUrl)
  if (serverSignOutUrl) setServerSignOutUrl(serverSignOutUrl)
  if (recaptchaSiteKey) setRecaptchaSiteKey(recaptchaSiteKey)

  const app = initializeApp(options);
  setApp(app);
  const appCheck = setAppCheck(app)
  const auth = setAuth(app)
  const analytics = setAnalytics(app)
  const firestore = setFirestore(app)
  const storage = setStorage(app)

  return {
    app,
    appCheck,
    auth,
    analytics,
    firestore,
    storage,
    getAppCheckToken,
    verifyIdToken,
    signIn,
    signOut,
    logEvent
  };
}

export { initialize }
