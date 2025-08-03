import { Auth, AuthProvider, User, UserCredential } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
declare const initializeAuth: (app: FirebaseApp) => Auth;
declare const verifyIdToken: (user: User) => Promise<boolean>;
type SignInParams = {
    email?: string;
    password?: string;
    provider?: AuthProvider;
};
declare const signIn: ({ email, password, provider }: SignInParams) => Promise<UserCredential>;
declare const signOut: (redirectUrl?: string) => Promise<boolean>;
export { initializeAuth, verifyIdToken, signIn, signOut };
