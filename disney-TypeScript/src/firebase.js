import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_9WHF3rwtlhI5GdSWFUZr1u01EXHncJU",
  authDomain: "typescript-disney-app.firebaseapp.com",
  projectId: "typescript-disney-app",
  storageBucket: "typescript-disney-app.appspot.com",
  messagingSenderId: "949990395653",
  appId: "1:949990395653:web:c47f44778fff892c6a316c"
};

const app = initializeApp(firebaseConfig);

export default app;