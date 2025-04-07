// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBne7s0GjNbyBN4eEBj3grdqwEnW6T-nOU",
  authDomain: "undersounds-oauth-5c097.firebaseapp.com",
  projectId: "undersounds-oauth-5c097",
  storageBucket: "undersounds-oauth-5c097.firebasestorage.app",
  messagingSenderId: "650689748313",
  appId: "1:650689748313:web:3345e1e2644b99cfd00048"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};