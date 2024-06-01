// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqsz521o5gnLrdbS_5CybHsHvt_mUuNoU",
  authDomain: "asset-management-system-auth.firebaseapp.com",
  projectId: "asset-management-system-auth",
  storageBucket: "asset-management-system-auth.appspot.com",
  messagingSenderId: "375980722565",
  appId: "1:375980722565:web:034c3b71a12849d8799cec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;