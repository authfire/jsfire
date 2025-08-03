import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore as initializeFirestore } from "firebase/firestore"

let _firestore: Firestore

const setFirestore = (app: FirebaseApp) => {
  _firestore = initializeFirestore(app);
}

const getFirestore = () => {
  return _firestore;
}

export { setFirestore, getFirestore }
