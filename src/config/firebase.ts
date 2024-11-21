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
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;