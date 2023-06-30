// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC_9WHF3rwtlhI5GdSWFUZr1u01EXHncJU",
  authDomain: "typescript-disney-app.firebaseapp.com",
  projectId: "typescript-disney-app",
  storageBucket: "typescript-disney-app.appspot.com",
  messagingSenderId: "949990395653",
  appId: "1:949990395653:web:c47f44778fff892c6a316c"
};

// Initialize Firebase
const app : FirebaseApp = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();