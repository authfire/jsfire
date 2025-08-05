export { signIn, signOut, verifyIdToken } from "./auth";
export { logEvent } from "./analytics";
declare let baseUrl: string;
declare let idTokenVerificationUrl: string | undefined;
declare let serverTokenUrl: string | undefined;
declare let serverSignOutUrl: string | undefined;
type configParams = {
    baseUrl: string;
    idTokenVerificationUrl?: string;
    serverTokenUrl?: string;
    serverSignOutUrl?: string;
};
declare const initialize: (params: configParams) => void;
export { initialize, baseUrl, idTokenVerificationUrl, serverTokenUrl, serverSignOutUrl };
