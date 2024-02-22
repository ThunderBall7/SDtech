import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "sdblog-8d18e.firebaseapp.com",
  projectId: "sdblog-8d18e",
  storageBucket: "sdblog-8d18e.appspot.com",
  messagingSenderId: "452063748324",
  appId: "1:452063748324:web:f6d1f7d7dcf7baec754cf1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
