import { FirebaseApp } from "firebase/app"
import { setAuth } from "./auth";
import { setAppCheck } from "./app-check";
import { setFirestore } from "./firestore";
import { setStorage } from "./storage";

let _app: FirebaseApp

export const setApp = (app: FirebaseApp) => {
  _app = app
  setAppCheck(app);
  setAuth(app);
  setFirestore(app);
  setStorage(app);
}

export const getApp = () => {
  return _app;
}
