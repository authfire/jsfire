import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
declare const setFirestore: (app: FirebaseApp) => void;
declare const getFirestore: () => Firestore;
export { setFirestore, getFirestore };
