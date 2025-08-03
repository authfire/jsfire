import { FirebaseApp } from "firebase/app";
import { FirebaseStorage, getStorage as initializeStorage } from "firebase/storage";

let _storage: FirebaseStorage

const setStorage = (app: FirebaseApp) => {
  _storage = initializeStorage(app)
  return _storage
}

const getStorage = () => {
  return _storage
}

export { setStorage, getStorage }
