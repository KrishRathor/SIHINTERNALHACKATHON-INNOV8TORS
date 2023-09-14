// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { FIREBASE_API_KEY } from './FirebaseKey';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "sih1-d8f06.firebaseapp.com",
  projectId: "sih1-d8f06",
  storageBucket: "sih1-d8f06.appspot.com",
  messagingSenderId: "71649354887",
  appId: "1:71649354887:web:51a7a8e0897c46955c0422",
  measurementId: "G-1T037M07EG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)