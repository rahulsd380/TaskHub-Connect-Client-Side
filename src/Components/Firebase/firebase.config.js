// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEjtyj4MFTqLhAmjkxsYtgDPuQsnJpoFI",
  authDomain: "taskhub-connect.firebaseapp.com",
  projectId: "taskhub-connect",
  storageBucket: "taskhub-connect.appspot.com",
  messagingSenderId: "512092558137",
  appId: "1:512092558137:web:d011280a68a6fc00fa4ee8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;