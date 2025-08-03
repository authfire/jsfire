import { FirebaseApp } from "firebase/app"

let _app: FirebaseApp

export const setApp = (app: FirebaseApp) => {
  _app = app
  return _app
}

export const getApp = () => {
  return _app;
}
