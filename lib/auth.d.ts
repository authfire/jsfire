import { Auth, GoogleAuthProvider, OAuthProvider, User, UserCredential } from "firebase/auth";
import { Analytics } from "firebase/analytics";
import { AppCheck } from "firebase/app-check";
declare const verifyIdToken: (user: User, appCheck?: AppCheck, analytics?: Analytics) => Promise<boolean>;
type SignInParams = {
    auth: Auth;
    email?: string;
    password?: string;
    provider?: GoogleAuthProvider | OAuthProvider;
    appCheck?: AppCheck;
    analytics?: Analytics;
};
declare const signIn: ({ auth, email, password, provider, appCheck, analytics }: SignInParams) => Promise<UserCredential>;
declare const signOut: (auth: Auth, appCheck?: AppCheck, analytics?: Analytics) => Promise<boolean>;
export { verifyIdToken, signIn, signOut };
