import { FirebaseApp } from "firebase/app";
import { FirebaseStorage } from "firebase/storage";
declare const setStorage: (app: FirebaseApp) => FirebaseStorage;
declare const getStorage: () => FirebaseStorage;
export { setStorage, getStorage };
