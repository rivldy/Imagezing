import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDG-O7261LDnKlEQXlRs4RXsfqSO8G-5iQ",
  authDomain: "imagezing-c65af.firebaseapp.com",
  projectId: "imagezing-c65af",
  storageBucket: "imagezing-c65af.appspot.com",
  messagingSenderId: "182009258531",
  appId: "1:182009258531:web:9b56861b88bc30c75c0796"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);