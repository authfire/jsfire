export { signIn, signOut, verifyIdToken } from "./auth"
export { logEvent } from "./analytics"

let baseUrl: string
let idTokenVerificationUrl: string|undefined
let serverTokenUrl: string|undefined
let serverSignOutUrl: string|undefined

type configParams = {
  baseUrl: string
  idTokenVerificationUrl?: string
  serverTokenUrl?: string
  serverSignOutUrl?: string
}

const initialize = (params: configParams) => {

  baseUrl = params.baseUrl
  idTokenVerificationUrl = params.idTokenVerificationUrl
  serverTokenUrl = params.serverTokenUrl
  serverSignOutUrl = params.serverSignOutUrl
}

export {
  initialize,
  baseUrl,
  idTokenVerificationUrl,
  serverTokenUrl,
  serverSignOutUrl
}
