import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// TODO: Replace with your Firebase project configuration
// Get this from Firebase Console -> Project Settings -> Your Apps -> Config
const firebaseConfig = {
  apiKey: "AIzaSyD6GIxiqXuUARXOkcOWPV34_7gvbuYTxNo",
  authDomain: "nutrimatch-6ebc0.firebaseapp.com",
  projectId: "nutrimatch-6ebc0",
  storageBucket: "nutrimatch-6ebc0.firebasestorage.app",
  messagingSenderId: "531684946227",
  appId: "1:531684946227:web:7a61633a82346f80678e46",
  measurementId: "G-L4WB8HX8P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;