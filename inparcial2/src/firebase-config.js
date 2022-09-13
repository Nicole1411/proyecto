import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDD8QvB7Ajwj3XvzyRKlchR6erOyOFM_E8",
  authDomain: "inparcial2-78c19.firebaseapp.com",
  projectId: "inparcial2-78c19",
  storageBucket: "inparcial2-78c19.appspot.com",
  messagingSenderId: "760745640813",
  appId: "1:760745640813:web:2eb8e7fa04f52316959064",
  measurementId: "G-8DVBZ0BZZM"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);