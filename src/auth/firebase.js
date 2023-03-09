// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAzeJHVTnFX4tbQ1gMcp10zrD1D0kaPz0",
  authDomain: "travelguide-f8278.firebaseapp.com",
  projectId: "travelguide-f8278",
  storageBucket: "travelguide-f8278.appspot.com",
  messagingSenderId: "174264598154",
  appId: "1:174264598154:web:ca44dae10f6c4b99797773",
  measurementId: "G-R1HL2JJTDL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider(app);

export const authEmail = getAuth(app);
export default app;

