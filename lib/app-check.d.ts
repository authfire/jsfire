import { FirebaseApp } from "firebase/app";
import { AppCheck } from "firebase/app-check";
export declare const setAppCheck: (app: FirebaseApp) => void;
export declare const getAppCheck: () => AppCheck;
export declare const getAppCheckToken: (forceRefresh?: boolean) => Promise<string>;
