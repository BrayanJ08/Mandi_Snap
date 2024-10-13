// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBseZ6KQmsRmeuOzgi6s1BXpSiPGyx_QOE",
  authDomain: "mandi-snap.firebaseapp.com",
  projectId: "mandi-snap",
  storageBucket: "mandi-snap.appspot.com",
  messagingSenderId: "840576835612",
  appId: "1:840576835612:web:5c8908aae8427f4fce7fd9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Se exporta firestore y auth
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
