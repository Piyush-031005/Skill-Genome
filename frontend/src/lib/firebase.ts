import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// config (same rahega)
const firebaseConfig = {
  apiKey: "AIzaSyBuPFvq0_Ri9wFhn9EQ-67TdUd81UNuu80",
  authDomain: "skill-genome-2afd7.firebaseapp.com",
  projectId: "skill-genome-2afd7",
  storageBucket: "skill-genome-2afd7.firebasestorage.app",
  messagingSenderId: "195694665124",
  appId: "1:195694665124:web:aaffd5ef1e68f9bccef531",
  measurementId: "G-KY3KTCGSM8"
};

// initialize
const app = initializeApp(firebaseConfig);

// ✅ IMPORTANT (ye missing tha)
export const auth = getAuth(app);