import { logEvent as _logEvent, Analytics } from "firebase/analytics";

export const logEvent = (analytics: Analytics|undefined, eventName: string, eventParams?: Record<string, any>) => {
  if (!analytics) return;

  _logEvent(analytics, eventName, eventParams)
}
