// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk_1Eg93DtK707RRF1CisLw5yI3JEYgUc",
  authDomain: "test-project-31e2d.firebaseapp.com",
  projectId: "test-project-31e2d",
  storageBucket: "test-project-31e2d.appspot.com",
  messagingSenderId: "782892160267",
  appId: "1:782892160267:web:61b002553fa5c690507e0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)