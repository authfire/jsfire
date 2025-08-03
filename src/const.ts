let idTokenVerificationUrl: string;
let serverSignOutUrl: string;
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

export const setRecaptchaSiteKey = (key: string) => {
  recaptchaSiteKey = key;
};

export const getRecaptchaSiteKey = () => {
  return recaptchaSiteKey;
};
