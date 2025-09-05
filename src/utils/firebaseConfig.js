// src/utils/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Cole aqui a configuração do Firebase copiada online
const firebaseConfig = {
  apiKey: "AIzaSyCt6JwIZrEjsUKxQIQ3Pz2sKXIDGhv4u_8",
  authDomain: "escolarize.firebaseapp.com",
  projectId: "escolarize",
  storageBucket: "escolarize.firebasestorage.app",
  messagingSenderId: "816657217965",
  appId: "1:816657217965:web:7513944c886ca50a254924"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
