import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClHo_GmoJNjTAPK_c-ganxo7sUSUoQ9TM",
  authDomain: "crmtest-e6bbc.firebaseapp.com",
  projectId: "crmtest-e6bbc",
  storageBucket: "crmtest-e6bbc.firebasestorage.app",
  messagingSenderId: "1023078326516",
  appId: "1:1023078326516:web:c8416fed048ad46a84bea1",
  measurementId: "G-66ZMWMGQ0E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
