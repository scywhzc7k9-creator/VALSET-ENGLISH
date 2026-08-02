import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAO6NuVRKb681SaYnFBcM2B755kFKgePSs",
  authDomain: "valset-english.firebaseapp.com",
  projectId: "valset-english",
  storageBucket: "valset-english.firebasestorage.app",
  messagingSenderId: "312877514776",
  appId: "1:312877514776:web:03b97075f96a493a8f036d",
  measurementId: "G-QJNHPNRMKB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch(console.error);

export { auth };
