import { FirebaseApp } from "firebase/app";
import { getRecaptchaSiteKey } from "./const";
import { AppCheck, getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

let _appCheck: AppCheck;

export const setAppCheck = (app: FirebaseApp) => {
  const recaptchaSiteKey = getRecaptchaSiteKey();

  if (typeof window === 'undefined' || !recaptchaSiteKey) {
    return;
  }

  _appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true
  });

  return _appCheck
};

export const getAppCheck = () => {
  return _appCheck;
};

export const getAppCheckToken = async (forceRefresh: boolean = false) => {
  if (_appCheck === undefined) {
    throw new Error("App Check is not initialized. Please call setAppCheck() with a FirebaseApp instance.");
  }
  const result = await getToken(_appCheck, forceRefresh);
  return result.token;
}
