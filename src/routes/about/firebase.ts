// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLSCJy73Rfwr55T2aZy7SLee9jlcILjOs",
  authDomain: "svapp-7def4.firebaseapp.com",
  projectId: "svapp-7def4",
  storageBucket: "svapp-7def4.appspot.com",
  messagingSenderId: "430354159361",
  appId: "1:430354159361:web:9b6785bc9d42368ba32d00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();