let idTokenVerificationUrl: string;
let serverSignOutUrl: string;
let serverTokenUrl: string;
let recaptchaSiteKey: string;

export const setIdTokenVerificationUrl = (url: string) => {
  idTokenVerificationUrl = url;
};

export const getIdTokenVerificationUrl = () => {
  return idTokenVerificationUrl;
};

export const setServerSignOutUrl = (url: string) => {
  serverSignOutUrl = url;
};

export const getServerSignOutUrl = () => {
  return serverSignOutUrl;
};

export const setServerTokenUrl = (url: string) => {
  serverTokenUrl = url;
};

export const getServerTokenUrl = () => {
  return serverTokenUrl;
};

export const setRecaptchaSiteKey = (key: string) => {
  recaptchaSiteKey = key;
};

export const getRecaptchaSiteKey = () => {
  return recaptchaSiteKey;
};
