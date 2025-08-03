"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirestore = exports.getAuth = exports.getApp = void 0;
var app_1 = require("./app");
Object.defineProperty(exports, "getApp", { enumerable: true, get: function () { return app_1.getApp; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "getAuth", { enumerable: true, get: function () { return auth_1.getAuth; } });
var firestore_1 = require("./firestore");
Object.defineProperty(exports, "getFirestore", { enumerable: true, get: function () { return firestore_1.getFirestore; } });
