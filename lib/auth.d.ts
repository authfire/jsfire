import { Auth, GoogleAuthProvider, OAuthProvider, User, UserCredential } from "firebase/auth";
import { Analytics } from "firebase/analytics";
declare const verifyIdToken: (user: User, url: string, appCheckToken?: string, analytics?: Analytics) => Promise<boolean>;
type SignInParams = {
    auth: Auth;
    email?: string;
    password?: string;
    provider?: GoogleAuthProvider | OAuthProvider;
    serverTokenUrl?: string;
    analytics?: Analytics;
};
declare const signIn: ({ auth, email, password, provider, serverTokenUrl, analytics }: SignInParams) => Promise<UserCredential>;
declare const signOut: (auth: Auth, serverSignOutUrl: string, appCheckToken?: string, redirectUrl?: string, analytics?: Analytics) => Promise<boolean>;
export { verifyIdToken, signIn, signOut };
