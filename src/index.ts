export { signIn, signOut, verifyIdToken } from "./auth"
export { logEvent } from "./analytics"

let baseUrl: string
let idTokenVerificationUrl: string|undefined
let serverTokenUrl: string|undefined
let serverSignOutUrl: string|undefined
let generateAppCheckToken: (() => Promise<string>)|undefined

type configParams = {
  baseUrl: string
  idTokenVerificationUrl?: string
  serverTokenUrl?: string
  serverSignOutUrl?: string
  generateAppCheckToken: () => Promise<string>
}

const initialize = (params: configParams) => {
  baseUrl = params.baseUrl
  idTokenVerificationUrl = params.idTokenVerificationUrl
  serverTokenUrl = params.serverTokenUrl
  serverSignOutUrl = params.serverSignOutUrl
  generateAppCheckToken = params.generateAppCheckToken
}

export {
  initialize,
  baseUrl,
  idTokenVerificationUrl,
  serverTokenUrl,
  serverSignOutUrl,
  generateAppCheckToken
}
