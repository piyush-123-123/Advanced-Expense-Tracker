import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "advanced-expense-tracker-5cd9d.firebaseapp.com",
  databaseURL: "https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com",
  projectId: "advanced-expense-tracker-5cd9d",
  storageBucket: "advanced-expense-tracker-5cd9d.firebasestorage.app",
  messagingSenderId: "412736317764",
  appId: "1:412736317764:web:b89ce0777b5c7150c9cf11"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };