export { signIn, signOut, verifyIdToken } from "./auth";
export { logEvent } from "./analytics";
declare let idTokenVerificationUrl: string | undefined;
declare let serverTokenUrl: string | undefined;
declare let serverSignOutUrl: string | undefined;
type configParams = {
    idTokenVerificationUrl?: string;
    serverTokenUrl?: string;
    serverSignOutUrl?: string;
};
declare const initialize: (params: configParams) => void;
export { initialize, idTokenVerificationUrl, serverTokenUrl, serverSignOutUrl };
