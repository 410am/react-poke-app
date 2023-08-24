// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgOzgqGMhlkhnT1ayCHA7RwUQvjCN75_E",
  authDomain: "react-poke-app-f328e.firebaseapp.com",
  projectId: "react-poke-app-f328e",
  storageBucket: "react-poke-app-f328e.appspot.com",
  messagingSenderId: "45035820623",
  appId: "1:45035820623:web:e8b0399fb38591bfdf3c3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;