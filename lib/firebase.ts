import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnF6fEAJwhy9Ny87E-MqHiSlWNzHcmoHg",
  authDomain: "another-ecommerce-firebase.firebaseapp.com",
  projectId: "another-ecommerce-firebase",
  storageBucket: "another-ecommerce-firebase.firebasestorage.app",
  messagingSenderId: "911417012411",
  appId: "1:911417012411:web:ef26c48867e572f5efb99e",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
