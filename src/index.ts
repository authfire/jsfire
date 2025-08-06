export { signIn, signOut, verifyIdToken } from "./auth"

let baseUrl: string
let idTokenVerificationUrl: string | undefined
let serverTokenUrl: string | undefined
let serverSignOutUrl: string | undefined
let getAppCheckToken: (() => Promise<string>) | undefined
let logEvent: ((eventName: string, eventParams?: Record<string, any>) => void) | undefined

type JsFireOptions = {
  baseUrl: string
  idTokenVerificationUrl?: string
  serverTokenUrl?: string
  serverSignOutUrl?: string
  getAppCheckToken?: () => Promise<string>
  logEvent?: (eventName: string, eventParams?: Record<string, any>) => void
}

const initializeJsFire = (options: JsFireOptions) => {
  baseUrl = options.baseUrl;
  idTokenVerificationUrl = options.idTokenVerificationUrl;
  serverTokenUrl = options.serverTokenUrl;
  serverSignOutUrl = options.serverSignOutUrl;
  getAppCheckToken = options.getAppCheckToken;
  logEvent = options.logEvent;
}

export { initializeJsFire, baseUrl, idTokenVerificationUrl, serverTokenUrl, serverSignOutUrl, getAppCheckToken, logEvent };
