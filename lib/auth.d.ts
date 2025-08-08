import { Auth, GoogleAuthProvider, OAuthProvider, User, UserCredential } from "firebase/auth";
declare const verifyIdToken: (user: User) => Promise<boolean>;
type SignInParams = {
    auth: Auth;
    email?: string;
    password?: string;
    provider?: GoogleAuthProvider | OAuthProvider;
    url?: string;
};
declare const signIn: ({ auth, email, password, provider, url }: SignInParams) => Promise<UserCredential>;
declare const signOut: (auth: Auth) => Promise<boolean>;
export { verifyIdToken, signIn, signOut };
