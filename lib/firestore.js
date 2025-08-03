"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirestore = exports.setFirestore = void 0;
const firestore_1 = require("firebase/firestore");
let _firestore;
const setFirestore = (app) => {
    _firestore = (0, firestore_1.getFirestore)(app);
    return _firestore;
};
exports.setFirestore = setFirestore;
const getFirestore = () => {
    return _firestore;
};
exports.getFirestore = getFirestore;
