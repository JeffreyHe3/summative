import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APPID}`
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };