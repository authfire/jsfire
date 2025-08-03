import { Analytics, getAnalytics as initializeAnalytics, logEvent as _logEvent } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";

let _analytics: Analytics;

export const setAnalytics = (app: FirebaseApp) => {
  _analytics = initializeAnalytics(app)
  return _analytics
};

export const getAnalytics = () => {
  return _analytics;
};

export const logEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  if (!_analytics) {
    throw new Error("Analytics is not initialized. Please call setAnalytics() with a FirebaseApp instance.");
  }
  _logEvent(_analytics, eventName, eventParams);
}
