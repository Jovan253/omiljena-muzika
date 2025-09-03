// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIxScRZjNcFwrO87zODRY3IzHE55ij6H8",
  authDomain: "kim-slusanje.firebaseapp.com",
  projectId: "kim-slusanje",
  storageBucket: "kim-slusanje.firebasestorage.app",
  messagingSenderId: "1092672502681",
  appId: "1:1092672502681:web:8079d7be0d28f0981f7108",
  measurementId: "G-YS1GZTKC6L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
