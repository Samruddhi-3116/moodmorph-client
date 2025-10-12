import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDP9tnX8206xTgJZtmqEZndG67YOfBSmcs",
  authDomain: "moodmorph-24ece.firebaseapp.com",
  projectId: "moodmorph-24ece",
  storageBucket: "moodmorph-24ece.appspot.com",
  messagingSenderId: "520611738957",
  appId: "1:520611738957:web:213275a536fc6f8fc7b304"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);