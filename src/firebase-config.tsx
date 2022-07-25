// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTCaPREcmwUmvRghL30yq0wrDi7iyxmEg",
    authDomain: "weather-app-7e045.firebaseapp.com",
    projectId: "weather-app-7e045",
    storageBucket: "weather-app-7e045.appspot.com",
    messagingSenderId: "950077368449",
    appId: "1:950077368449:web:e6b4606dd4fe416611c580"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);