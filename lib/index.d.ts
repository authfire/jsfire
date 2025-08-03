import { FirebaseOptions } from "firebase/app";
declare const initialize: (options: FirebaseOptions, idTokenVerificationUrl?: string, serverSignOutUrl?: string, recaptchaSiteKey?: string) => {
    app: import("@firebase/app").FirebaseApp;
    appCheck: import("@firebase/app-check").AppCheck | undefined;
    auth: import("@firebase/auth").Auth;
    analytics: import("@firebase/analytics").Analytics | undefined;
    firestore: import("@firebase/firestore").Firestore;
    storage: import("@firebase/storage").FirebaseStorage;
    getAppCheckToken: (forceRefresh?: boolean) => Promise<string>;
    verifyIdToken: (user: import("@firebase/auth").User) => Promise<boolean>;
    signIn: ({ email, password, provider }: {
        email?: string;
        password?: string;
        provider?: import("@firebase/auth").AuthProvider;
    }) => Promise<import("@firebase/auth").UserCredential>;
    signOut: (redirectUrl?: string) => Promise<boolean>;
    logEvent: (eventName: string, eventParams?: {
        [key: string]: any;
    }) => void;
};
export { initialize };
