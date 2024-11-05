// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8zKk6hk4lvqQ4nUnW5g3QtKFGy9bWMLo",
  authDomain: "resumecreation-fbc67.firebaseapp.com",
  databaseURL: "https://resumecreation-fbc67-default-rtdb.firebaseio.com",
  projectId: "resumecreation-fbc67",
  storageBucket: "resumecreation-fbc67.appspot.com",
  messagingSenderId: "63245222875",
  appId: "1:63245222875:web:739cd6ce4939d808001dfe",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const storage = getStorage(app);
