export { signIn, signOut, verifyIdToken } from "./auth"
export { logEvent } from "./analytics"

let idTokenVerificationUrl: string|undefined
let serverTokenUrl: string|undefined
let serverSignOutUrl: string|undefined

type configParams = {
  idTokenVerificationUrl?: string
  serverTokenUrl?: string
  serverSignOutUrl?: string
}

const initialize = (params: configParams) => {
  idTokenVerificationUrl = params.idTokenVerificationUrl
  serverTokenUrl = params.serverTokenUrl
  serverSignOutUrl = params.serverSignOutUrl
}

export {
  initialize,
  idTokenVerificationUrl,
  serverTokenUrl,
  serverSignOutUrl
}
