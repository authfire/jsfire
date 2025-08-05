import { Auth, GoogleAuthProvider, OAuthProvider, User, UserCredential } from "firebase/auth";
import { Analytics } from "firebase/analytics";
import { AppCheck } from "firebase/app-check";
declare const verifyIdToken: (user: User, appCheck?: AppCheck, analytics?: Analytics) => Promise<boolean>;
type SignInParams = {
    auth: Auth;
    email?: string;
    password?: string;
    provider?: GoogleAuthProvider | OAuthProvider;
    analytics?: Analytics;
};
declare const signIn: ({ auth, email, password, provider, analytics }: SignInParams) => Promise<UserCredential>;
declare const signOut: (auth: Auth, serverSignOutUrl: string, appCheck?: AppCheck, redirectUrl?: string, analytics?: Analytics) => Promise<boolean>;
export { verifyIdToken, signIn, signOut };
