"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecaptchaSiteKey = exports.setRecaptchaSiteKey = exports.getServerTokenUrl = exports.setServerTokenUrl = exports.getServerSignOutUrl = exports.setServerSignOutUrl = exports.getIdTokenVerificationUrl = exports.setIdTokenVerificationUrl = void 0;
let idTokenVerificationUrl;
let serverSignOutUrl;
let serverTokenUrl;
let recaptchaSiteKey;
const setIdTokenVerificationUrl = (url) => {
    idTokenVerificationUrl = url;
};
exports.setIdTokenVerificationUrl = setIdTokenVerificationUrl;
const getIdTokenVerificationUrl = () => {
    return idTokenVerificationUrl;
};
exports.getIdTokenVerificationUrl = getIdTokenVerificationUrl;
const setServerSignOutUrl = (url) => {
    serverSignOutUrl = url;
};
exports.setServerSignOutUrl = setServerSignOutUrl;
const getServerSignOutUrl = () => {
    return serverSignOutUrl;
};
exports.getServerSignOutUrl = getServerSignOutUrl;
const setServerTokenUrl = (url) => {
    serverTokenUrl = url;
};
exports.setServerTokenUrl = setServerTokenUrl;
const getServerTokenUrl = () => {
    return serverTokenUrl;
};
exports.getServerTokenUrl = getServerTokenUrl;
const setRecaptchaSiteKey = (key) => {
    recaptchaSiteKey = key;
};
exports.setRecaptchaSiteKey = setRecaptchaSiteKey;
const getRecaptchaSiteKey = () => {
    return recaptchaSiteKey;
};
exports.getRecaptchaSiteKey = getRecaptchaSiteKey;
