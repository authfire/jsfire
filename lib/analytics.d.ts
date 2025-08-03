import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
export declare const setAnalytics: (app: FirebaseApp) => Analytics | undefined;
export declare const getAnalytics: () => Analytics;
export declare const logEvent: (eventName: string, eventParams?: {
    [key: string]: any;
}) => void;
