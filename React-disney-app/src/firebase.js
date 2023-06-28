import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOYeAY3QjEkwiw8BMdmRkEGk34A_ImsWs",
  authDomain: "react-disneyplus-app-2b2cf.firebaseapp.com",
  projectId: "react-disneyplus-app-2b2cf",
  storageBucket: "react-disneyplus-app-2b2cf.appspot.com",
  messagingSenderId: "899078611691",
  appId: "1:899078611691:web:6c05d5ac0e2302cc2c94ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;