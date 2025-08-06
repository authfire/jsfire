export { signIn, signOut, verifyIdToken } from "./auth";
declare let baseUrl: string;
declare let idTokenVerificationUrl: string | undefined;
declare let serverTokenUrl: string | undefined;
declare let serverSignOutUrl: string | undefined;
declare let getAppCheckToken: (() => Promise<string>) | undefined;
declare let logEvent: ((eventName: string, eventParams?: Record<string, any>) => void) | undefined;
type JsFireOptions = {
    baseUrl: string;
    idTokenVerificationUrl?: string;
    serverTokenUrl?: string;
    serverSignOutUrl?: string;
    getAppCheckToken?: () => Promise<string>;
    logEvent?: (eventName: string, eventParams?: Record<string, any>) => void;
};
declare const initializeJsFire: (options: JsFireOptions) => void;
export { initializeJsFire, baseUrl, idTokenVerificationUrl, serverTokenUrl, serverSignOutUrl, getAppCheckToken, logEvent };
