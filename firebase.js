// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC7tq28kbA4NbTKZhC0Dg-THBThTxptgtk",
  authDomain: "studio-3920584840-dfcc1.firebaseapp.com",
  projectId: "studio-3920584840-dfcc1",
  storageBucket: "studio-3920584840-dfcc1.firebasestorage.app",
  messagingSenderId: "255041806560",
  appId: "1:255041806560:web:d34a219815303e6b57f085"
};

const app = initializeApp(firebaseConfig);
export default app;