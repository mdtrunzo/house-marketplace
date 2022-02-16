import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG3Wewtw_O4pg22caQCNkm3Zhi_ybT_r0",
  authDomain: "house-marketplace-app-2278e.firebaseapp.com",
  projectId: "house-marketplace-app-2278e",
  storageBucket: "house-marketplace-app-2278e.appspot.com",
  messagingSenderId: "67503314660",
  appId: "1:67503314660:web:a05c4606a3654ecd0ebef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()