// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0b_7TsoHJD_jQxY5j_Y7AJw5lkJt5A-I",
  authDomain: "portfolio-8d5e6.firebaseapp.com",
  projectId: "portfolio-8d5e6",
  storageBucket: "portfolio-8d5e6.appspot.com",
  messagingSenderId: "621866443645",
  appId: "1:621866443645:web:a5e203f03d01f6336de214",
  measurementId: "G-TDQL9KMKWV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
