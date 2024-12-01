<<<<<<< HEAD
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKU1P3u4jN15fvmZgRxgNOk1Cr9XGp50g",
  authDomain: "aura-da8f5.firebaseapp.com",
  projectId: "aura-da8f5",
  storageBucket: "aura-da8f5.firebasestorage.app",
  messagingSenderId: "355946697342",
  appId: "1:355946697342:web:c39a53f186401bec8bfe2f"
=======
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
>>>>>>> 23af5a2 (amelioration des quelque pages et supression des clés firebase)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

<<<<<<< HEAD
// Get Firebase services
=======
>>>>>>> 23af5a2 (amelioration des quelque pages et supression des clés firebase)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

<<<<<<< HEAD
export default app;
=======
export default app;
>>>>>>> 23af5a2 (amelioration des quelque pages et supression des clés firebase)
