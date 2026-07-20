import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAF3mGVzRIVBfcDUwxgUjTKXMgYBXBBY4M",
  authDomain: "react-http-cc42a.firebaseapp.com",
  databaseURL: "https://react-http-cc42a-default-rtdb.firebaseio.com",
  projectId: "react-http-cc42a",
  storageBucket: "react-http-cc42a.firebasestorage.app",
  messagingSenderId: "333661808962",
  appId: "1:333661808962:web:fdac99a411d5bac732c0db"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };